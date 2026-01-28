import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSpiritualProfileSchema } from "@shared/schema";

import Anthropic from "@anthropic-ai/sdk";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  const anthropic = new Anthropic({
    apiKey: process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL,
  });

  app.get("/api/profile", async (req, res) => {
    // For MVP, we'll use a hardcoded user ID or session if implemented
    const profile = await storage.getSpiritualProfile("default-user");
    // Return premium status by default so you can check it out
    res.json({ ...(profile || {}), isPremium: true });
  });

  app.post("/api/profile", async (req, res) => {
    try {
      console.log("POST /api/profile request body:", JSON.stringify(req.body));
      
      // Pre-process birthDate to be a Date object for Zod validation if it's a string
      const body = { ...req.body };
      if (typeof body.birthDate === "string") {
        body.birthDate = new Date(body.birthDate);
      }
      
      const result = insertSpiritualProfileSchema.safeParse(body);
      
      if (!result.success) {
        console.error("Validation error details:", JSON.stringify(result.error.format(), null, 2));
        return res.status(400).json({ 
          error: "Invalid profile data", 
          details: result.error.format() 
        });
      }
      
      const userId = result.data.userId || "default-user";
      
      // Ensure user exists first
      try {
        const user = await storage.getUser(userId);
        if (!user) {
          console.log("Creating default user:", userId);
          await storage.createUser({
            id: userId,
            username: `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            password: "password",
            isPremium: true
          });
        }
      } catch (userError) {
        console.error("User management error:", userError);
      }

      const birthDate = result.data.birthDate || new Date();
      const birthTime = result.data.birthTime || "12:00";
      const birthLocation = result.data.birthLocation || "Unknown";

      // Use Claude for high-precision spiritual calculations
      const prompt = `Act as an expert Vedic astrologer, Human Design professional, and Numerologist. 
      Calculate high-precision spiritual data for:
      Birth Date: ${birthDate.toISOString()}
      Birth Time: ${birthTime}
      Birth Location: ${birthLocation}

      Required Fields (strictly return JSON):
      {
        "astrology": {
          "sunSign": "string",
          "moonSign": "string",
          "ascendant": "string",
          "sunInsight": "string",
          "moonInsight": "string",
          "insight": "string"
        },
        "sidereal": {
          "atmakaraka": "string",
          "lagnam": "string",
          "rahu": "string",
          "ketu": "string",
          "atmakarakaInsight": "string",
          "lagnamInsight": "string"
        },
        "numerology": {
          "lifePath": number,
          "personalYear": number,
          "insight": "string"
        },
        "humanDesign": {
          "type": "string",
          "strategy": "string",
          "insight": "string"
        }
      }`;

      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      });

      const content = response.content[0].type === 'text' ? response.content[0].text : '';
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Failed to parse spiritual data from AI");
      const spiritualData = JSON.parse(jsonMatch[0]);

      const profile = await storage.upsertSpiritualProfile({
        ...result.data,
        userId,
        astrologyChart: spiritualData.astrology,
        siderealChart: spiritualData.sidereal,
        numerologyNumbers: spiritualData.numerology,
        humanDesignBodygraph: spiritualData.humanDesign
      });
      
      console.log("Profile upserted successfully:", profile.id);
      res.json(profile);
    } catch (error: any) {
      console.error("Profile saving crash:", error);
      res.status(500).json({ 
        error: "Internal server error during profile save",
        message: error.message 
      });
    }
  });

  return httpServer;
}
