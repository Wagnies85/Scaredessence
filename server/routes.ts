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
    const result = insertSpiritualProfileSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const profile = await storage.upsertSpiritualProfile(result.data);
    res.json(profile);
  });

  return httpServer;
}
