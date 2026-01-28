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

      // Calculate Tropical placements
      const getSunSign = (date: Date) => {
        const m = date.getUTCMonth() + 1;
        const d = date.getUTCDate();
        if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return "Aries";
        if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return "Taurus";
        if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return "Gemini";
        if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return "Cancer";
        if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return "Leo";
        if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return "Virgo";
        if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return "Libra";
        if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return "Scorpio";
        if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return "Sagittarius";
        if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return "Capricorn";
        if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return "Aquarius";
        return "Pisces";
      };

      const sunSign = getSunSign(result.data.birthDate || new Date());

      const astrologyChart = {
        sunSign: sunSign,
        moonSign: "Libra",
        sunInsight: `Your ${sunSign} sun provides your core vitality and identity.`,
        moonInsight: "Your Libra moon needs emotional balance and aesthetic surroundings to feel secure.",
        currentTransit: "Moon in Libra",
        insight: `With your Sun in ${sunSign} and Moon in Libra, you balance deep intuition with a need for social harmony.`
      };

      const siderealChart = {
        atmakaraka: "Jupiter",
        lagnam: "Libra",
        rahu: "Gemini",
        ketu: "Sagittarius",
        atmakarakaInsight: "Your Soul King. Indicates a purpose rooted in wisdom and expansion.",
        lagnamInsight: "Your Rising Sign is Libra. You seek balance, harmony, and refined beauty in all expressions of life.",
        rahuInsight: "Rahu in Gemini: Soul hunger for communication and new information.",
        ketuInsight: "Ketu in Sagittarius: Philosophical detachment and ancestral wisdom."
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
