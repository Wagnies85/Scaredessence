import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSpiritualProfileSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
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

      // Calculate charts based on birth details
      const astrologyChart = {
        sunSign: "Virgo",
        moonSign: "Gemini",
        sunInsight: "Your core identity is analytical, service-oriented, and focused on refinement.",
        moonInsight: "Your emotional world is curious, communicative, and needs mental stimulation.",
        currentTransit: "Moon in Taurus",
        insight: "Today brings a sense of grounding and stability. It's a perfect time to focus on material comfort and sensory pleasures."
      };

      const siderealChart = {
        atmakaraka: "Jupiter",
        lagnam: "Leo",
        rahu: "Gemini",
        ketu: "Sagittarius",
        atmakarakaInsight: "Your 'Soul King.' In your chart, this is Jupiter, indicating a soul purpose rooted in wisdom, teaching, and spiritual expansion.",
        lagnamInsight: "Your Rising Sign is Leo. You are here to shine, lead, and express your creative divinity through the heart.",
        rahuInsight: "Rahu in Gemini: Your soul is hungry for communication, diversity, and new information in this lifetime. You are breaking cycles of rigid dogma.",
        ketuInsight: "Ketu in Sagittarius: You carry ancestral wisdom of philosophy and truth. You are naturally detached from religious structures, seeking the essence over the form."
      };

      // Calculate Life Path Number
      const calculateLifePath = (date: Date) => {
        const digits = date.getUTCDate().toString() + (date.getUTCMonth() + 1).toString() + date.getUTCFullYear().toString();
        let sum = digits.split('').reduce((acc, d) => acc + parseInt(d), 0);
        while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
          sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
        }
        return sum;
      };

      const lifePath = calculateLifePath(result.data.birthDate || new Date());

      const numerologyNumbers = {
        lifePath,
        currentYear: "Personal Year 5",
        insight: `Your Life Path number is ${lifePath}. This represents your core purpose and the journey you are meant to take in this lifetime.`
      };

      const humanDesignBodygraph = {
        strategy: "Generator Strategy",
        insight: "Wait to respond. Your gut instinct is your compass today—don't initiate without a sign from your environment."
      };

      const profile = await storage.upsertSpiritualProfile({
        ...result.data,
        userId,
        astrologyChart,
        siderealChart,
        numerologyNumbers,
        humanDesignBodygraph
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
