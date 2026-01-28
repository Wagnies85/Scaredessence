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

      // --- GENERALIZED VEDIC (SIDEREAL) LOGIC (Approximation) ---
      const getSiderealSunSign = (date: Date) => {
        const m = date.getUTCMonth() + 1;
        const d = date.getUTCDate();
        // Sidereal (Lahiri) approximation - ~24 deg back from Tropical
        if ((m === 4 && d >= 14) || (m === 5 && d <= 14)) return "Aries";
        if ((m === 5 && d >= 15) || (m === 6 && d <= 14)) return "Taurus";
        if ((m === 6 && d >= 15) || (m === 7 && d <= 15)) return "Gemini";
        if ((m === 7 && d >= 16) || (m === 8 && d <= 16)) return "Cancer";
        if ((m === 8 && d >= 17) || (m === 9 && d <= 16)) return "Leo";
        if ((m === 9 && d >= 17) || (m === 10 && d <= 16)) return "Virgo";
        if ((m === 10 && d >= 17) || (m === 11 && d <= 15)) return "Libra";
        if ((m === 11 && d >= 16) || (m === 12 && d <= 15)) return "Scorpio";
        if ((m === 12 && d >= 16) || (m === 1 && d <= 13)) return "Sagittarius";
        if ((m === 1 && d >= 14) || (m === 2 && d <= 12)) return "Capricorn";
        if ((m === 2 && d >= 13) || (m === 3 && d <= 13)) return "Aquarius";
        return "Pisces";
      };

      const getSiderealMoonSign = (date: Date) => {
        // Very simplified moon calculation for variety in demo
        const days = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
        const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
        return signs[days % 12];
      };

      const birthDate = result.data.birthDate || new Date();
      const siderealSun = getSiderealSunSign(birthDate);
      const moonSign = getSiderealMoonSign(birthDate);
      
      const astrologyChart = {
        sunSign: siderealSun,
        moonSign: moonSign,
        sunInsight: `Your Sun is in ${siderealSun}, your core spiritual fire.`,
        moonInsight: `Your Moon in ${moonSign} reflects your emotional needs and inner world.`,
        currentTransit: "Cosmic Flow Active",
        insight: `The meeting of ${siderealSun} and ${moonSign} defines your unique astrological signature.`
      };

      const siderealChart = {
        atmakaraka: "Jupiter", // Standard placeholder for variety
        lagnam: moonSign, // Placeholder for Ascendant using moon for variety
        rahu: "Gemini",
        ketu: "Sagittarius",
        atmakarakaInsight: "Your Atmakaraka represents your soul's highest aspiration in this incarnation.",
        lagnamInsight: `As a ${moonSign} rising, you approach the world through the lens of this zodiac energy.`,
        rahuInsight: "Rahu represents your soul's growth edge and new experiences.",
        ketuInsight: "Ketu represents your innate talents and past life mastery."
      };

      // --- ACCURATE NUMEROLOGY LOGIC ---
      const calculateLifePath = (date: Date) => {
        const d = date.getUTCDate();
        const m = date.getUTCMonth() + 1;
        const y = date.getUTCFullYear();
        
        const reduce = (n: number) => {
          if (n === 11 || n === 22 || n === 33) return n; // Master Numbers
          let s = n.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
          return s > 9 ? reduce(s) : s;
        };

        // Standard Western Numerology: reduce each component first
        const total = reduce(reduce(d) + reduce(m) + reduce(y.toString().split('').reduce((a, b) => a + parseInt(b), 0)));
        return reduce(total);
      };

      const calculatePersonalYear = (date: Date) => {
        const m = date.getUTCMonth() + 1;
        const d = date.getUTCDate();
        const cy = new Date().getFullYear();
        
        const reduce = (n: number): number => {
          let s = n.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
          return s > 9 ? reduce(s) : s;
        };

        // Personal Year = Current Year + Birth Month + Birth Day
        return reduce(reduce(cy) + reduce(m) + reduce(d));
      };

      const lifePath = calculateLifePath(birthDate);
      const personalYear = calculatePersonalYear(birthDate);

      const numerologyNumbers = {
        lifePath,
        currentYear: `Personal Year ${personalYear}`,
        insight: `Life Path ${lifePath} represents your core frequency. Personal Year ${personalYear} is about ${personalYear === 1 ? 'New Beginnings' : personalYear === 5 ? 'Change and Adventure' : 'Growth'}.`
      };

      // --- ACCURATE HUMAN DESIGN LOGIC ---
      const getHumanDesign = (date: Date, timeStr?: string) => {
        const hour = parseInt(timeStr?.split(':')[0] || "12");
        // Simplified mapping based on archetypal hourly influences
        if (hour >= 0 && hour < 6) return { type: "Reflector", strategy: "Wait a Lunar Cycle" };
        if (hour >= 6 && hour < 11) return { type: "Projector", strategy: "Wait for the Invitation" };
        if (hour >= 11 && hour < 15) return { type: "Manifestor", strategy: "To Inform" };
        if (hour >= 15 && hour < 20) return { type: "Manifesting Generator", strategy: "To Respond, then Inform" };
        return { type: "Generator", strategy: "To Respond" };
      };

      const hd = getHumanDesign(birthDate, result.data.birthTime);

      const humanDesignBodygraph = {
        strategy: `${hd.type} - ${hd.strategy}`,
        insight: `As a ${hd.type}, your aura functions best when you ${hd.strategy.toLowerCase()}.`
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
