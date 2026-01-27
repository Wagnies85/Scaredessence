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
      console.log("POST /api/profile request body:", req.body);
      const result = insertSpiritualProfileSchema.safeParse(req.body);
      if (!result.success) {
        console.error("Validation error details:", JSON.stringify(result.error.format(), null, 2));
        return res.status(400).json({ 
          error: "Invalid profile data", 
          details: result.error.format() 
        });
      }
      
      const userId = result.data.userId || "default-user";
      const user = await storage.getUser(userId);
      if (!user) {
        console.log("Creating default user:", userId);
        await storage.createUser({
          id: userId,
          username: "default_user",
          password: "password",
          isPremium: true
        });
      }

      const profile = await storage.upsertSpiritualProfile({
        ...result.data,
        userId
      });
      res.json(profile);
    } catch (error: any) {
      console.error("Profile upsert error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  return httpServer;
}
