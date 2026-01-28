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

      // --- REFINED VEDIC (SIDEREAL) LOGIC ---
      const getSiderealSunSign = (date: Date) => {
        const m = date.getUTCMonth() + 1;
        const d = date.getUTCDate();
        // Sidereal (Lahiri) approximation - approx 14th/15th of the month transitions
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
        // Improved approximation using lunar cycle (27.3 days)
        const msInDay = 86400000;
        const epoch = new Date("2000-01-01T00:00:00Z").getTime();
        const diff = date.getTime() - epoch;
        const days = diff / msInDay;
        const cycle = 27.32166;
        const pos = (days % cycle) / cycle;
        const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
        return signs[Math.floor(pos * 12)];
      };

      const birthDate = result.data.birthDate || new Date();
      const siderealSun = getSiderealSunSign(birthDate);
      const moonSign = getSiderealMoonSign(birthDate);
      
      const astrologyChart = {
        sunSign: siderealSun,
        moonSign: moonSign,
        sunInsight: `Your Sun is in ${siderealSun}, representing your soul's purpose and vitality in the Sidereal system.`,
        moonInsight: `Your Moon in ${moonSign} governs your emotional subconscious and internal comfort.`,
        currentTransit: "Jupiter in Taurus (Sidereal)",
        insight: `The alignment of ${siderealSun} Sun and ${moonSign} Moon suggests a unique balance between your outer expression and inner needs.`
      };

      const siderealChart = {
        atmakaraka: "Varies", 
        lagnam: "Calculated by Time",
        rahu: "Varies",
        ketu: "Varies",
        atmakarakaInsight: "The planet with the highest degree in your chart, representing your soul's king/queen.",
        lagnamInsight: "Your Rising sign defines your physical body and path in this life.",
        rahuInsight: "Rahu shows where you are meant to expand and break boundaries.",
        ketuInsight: "Ketu shows your natural gifts and past-life completions."
      };

      // --- STANDARD NUMEROLOGY LOGIC ---
      const calculateLifePath = (date: Date) => {
        const d = date.getUTCDate();
        const m = date.getUTCMonth() + 1;
        const y = date.getUTCFullYear();
        
        const reduce = (n: number, allowMaster = true): number => {
          if (allowMaster && (n === 11 || n === 22 || n === 33)) return n;
          let s = n.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
          return s > 9 ? reduce(s, allowMaster) : s;
        };

        const redD = reduce(d);
        const redM = reduce(m);
        const redY = reduce(y.toString().split('').reduce((a, b) => a + parseInt(b), 0));
        
        return reduce(redD + redM + redY, true);
      };

      const calculatePersonalYear = (date: Date) => {
        const m = date.getUTCMonth() + 1;
        const d = date.getUTCDate();
        const cy = new Date().getFullYear();
        
        const reduce = (n: number): number => {
          let s = n.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
          return s > 9 ? reduce(s) : s;
        };

        const redM = reduce(m);
        const redD = reduce(d);
        const redY = reduce(cy);
        
        return reduce(redM + redD + redY);
      };

      const lifePath = calculateLifePath(birthDate);
      const personalYear = calculatePersonalYear(birthDate);

      const numerologyNumbers = {
        lifePath,
        currentYear: `Personal Year ${personalYear}`,
        insight: `Your Life Path ${lifePath} indicates your primary life lessons. Your Personal Year ${personalYear} suggests this is a time for ${
          personalYear === 1 ? 'new beginnings and independence' :
          personalYear === 2 ? 'cooperation and patience' :
          personalYear === 3 ? 'creativity and social expansion' :
          personalYear === 4 ? 'hard work and building foundations' :
          personalYear === 5 ? 'change, freedom, and adventure' :
          personalYear === 6 ? 'responsibility and family' :
          personalYear === 7 ? 'introspection and spiritual growth' :
          personalYear === 8 ? 'power, money, and manifestation' :
          'completion and letting go'
        }.`
      };

      // --- IMPROVED HUMAN DESIGN TYPE MAPPING ---
      const getHumanDesign = (date: Date, timeStr?: string) => {
        const hour = parseInt(timeStr?.split(':')[0] || "12");
        // Statistical approximation of Type distribution
        if (hour < 4) return { type: "Projector", strategy: "Wait for the Invitation" };
        if (hour < 8) return { type: "Manifestor", strategy: "To Inform" };
        if (hour < 16) return { type: "Generator", strategy: "To Respond" };
        if (hour < 21) return { type: "Manifesting Generator", strategy: "To Respond, then Inform" };
        return { type: "Reflector", strategy: "Wait a Lunar Cycle" };
      };

      const hd = getHumanDesign(birthDate, result.data.birthTime ?? undefined);

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
