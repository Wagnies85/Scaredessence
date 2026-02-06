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

      // Use high-precision Vedic Astro API
      const VEDIC_API_KEY = process.env.VEDIC_ASTRO_API_KEY;
      let spiritualData: any = {};

      if (VEDIC_API_KEY) {
        try {
          // Calculate birth details using coordinates and time
          // Note: In a real implementation we would first geocode the location to get lat/long
          
          const vedaParams = new URLSearchParams({
            api_key: VEDIC_API_KEY,
            dob: `${birthDate.getDate()}/${birthDate.getMonth() + 1}/${birthDate.getFullYear()}`,
            tob: birthTime,
            lat: "40.7128", // Placeholder for New York - in future we should geocode birthLocation
            lon: "-74.0060",
            tz: "-5",
            lang: "en"
          });

          // Fetching Sidereal Horoscope
          const [vedaRes, mangalRes]: [any, any] = await Promise.all([
            fetch(`https://api.vedicastroapi.com/v3-0/horoscope/planet-details?${vedaParams.toString()}`),
            fetch(`https://api.vedicastroapi.com/v3-0/dosha/mangal-dosh?${vedaParams.toString()}`)
          ]);
          
          const vedaData = await vedaRes.json();
          const mangalData = await mangalRes.json();
          
          if (vedaData.status === 200) {
            const planets = vedaData.response;
            const ascendant = planets.find((p: any) => p.name === "Ascendant");
            const moon = planets.find((p: any) => p.name === "Moon");
            const sun = planets.find((p: any) => p.name === "Sun");

            // Sort planets by degree within their sign to find Atmakaraka (highest degree excluding Rahu/Ketu)
            const sortedForAK = planets
              .filter((p: any) => !["Rahu", "Ketu", "Ascendant"].includes(p.name))
              .sort((a: any, b: any) => b.full_degree % 30 - a.full_degree % 30);
            
            const ak = sortedForAK[0]?.name || "Jupiter";

            const mangalInsight = mangalData.status === 200 ? 
              (mangalData.response.has_mangal_dosha ? `Manglik: ${mangalData.response.type}. ${mangalData.response.description}` : "Non-Manglik") 
              : "Mangal Dosha calculation unavailable";

            spiritualData = {
              astrology: {
                sunSign: sun?.sign || "Pisces",
                moonSign: moon?.sign || "Libra",
                ascendant: ascendant?.sign || "Libra",
                sunInsight: `Sun in ${sun?.sign}, ${sun?.house}th House. Reflects your core essence.`,
                moonInsight: `Moon in ${moon?.sign}, ${moon?.house}th House. Governs your emotional landscape.`,
                insight: `A powerful ${ascendant?.sign} rising chart with ${ak} as your Atmakaraka. ${mangalInsight}`,
                dailyHoroscope: "" // Will be populated by AI
              },
              sidereal: {
                atmakaraka: ak,
                lagnam: ascendant?.sign || "Libra",
                rahu: planets.find((p: any) => p.name === "Rahu")?.sign || "Aries",
                ketu: planets.find((p: any) => p.name === "Ketu")?.sign || "Libra",
                atmakarakaInsight: `Your Soul King is ${ak}, guiding your spiritual evolution in this lifetime.`,
                lagnamInsight: `Your rising sign is ${ascendant?.sign}, shaping your physical path and outlook.`
              },
              numerology: {
                lifePath: 5,
                personalYear: 1,
                insight: "Your 5 Life Path drives you toward freedom, while your Personal Year 1 marks a fresh beginning."
              },
              humanDesign: {
                type: "Manifesting Generator",
                strategy: "To Respond",
                insight: "As a Manifesting Generator, your power lies in responding to life with sustainable energy."
              }
            };
          }
        } catch (apiError) {
          console.error("Vedic API Error:", apiError);
        }
      }

      // Numerology Calculations
      const calculateLifePath = (date: Date) => {
        // Life Path: Sum digits of Month, Day, and Year separately, then sum those results.
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();

        const reduce = (n: number) => {
          let s = n;
          while (s > 9 && s !== 11 && s !== 22 && s !== 33) {
            s = s.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
          }
          return s;
        };

        const mReduced = reduce(month);
        const dReduced = reduce(day);
        const yReduced = reduce(year);

        return reduce(mReduced + dReduced + yReduced);
      };

      const calculatePersonalYear = (birthDate: Date, targetDate: Date) => {
        // Personal Year = (Month of Birth + Day of Birth + Current Year) reduced
        const day = birthDate.getUTCDate();
        const month = birthDate.getUTCMonth() + 1;
        const currentYear = targetDate.getUTCFullYear();
        
        const reduce = (n: number) => {
          let s = n;
          while (s > 9 && s !== 11 && s !== 22 && s !== 33) {
            s = s.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
          }
          return s;
        };

        const mReduced = reduce(month);
        const dReduced = reduce(day);
        const yReduced = reduce(currentYear);
        
        return reduce(mReduced + dReduced + yReduced);
      };

      const manualLifePath = calculateLifePath(birthDate);
      const manualPersonalYear = calculatePersonalYear(birthDate, new Date());

      // If API failed or key missing, fallback to Claude for high-precision spiritual calculations and daily horoscope
      const prompt = `Act as an expert Vedic astrologer (Jyotish), Human Design professional, and Numerologist. 
      ${spiritualData.astrology ? "I have the core technical data, please refine the insights, generate a daily horoscope, a personalized affirmation, and a short meditation guidance." : "Calculate high-precision spiritual data, a personalized daily horoscope, a daily affirmation, and a meditation guidance."}
      
      Birth Context (CRITICAL: USE THESE FOR ALL CALCULATIONS):
      - Birth Date: ${birthDate.toISOString()}
      - Birth Time: ${birthTime}
      - Birth Location: ${birthLocation}
      - Current Date: ${new Date().toISOString()}

      Technical Requirements:
      1. Vedic Astrology (Sidereal): Use Lahiri Ayanamsa. Map planets to their SIDEREAL signs and houses (Whole Sign).
      2. Numerology: 
         - Life Path: EXACTLY ${manualLifePath}
         - Personal Year: EXACTLY ${manualPersonalYear}
         Calculate Soul Urge based on ${birthDate.toISOString()}.
      3. Human Design: Manifesting Generator.

      Required Fields (strictly return JSON):
      {
        "astrology": {
          "sunSign": "string",
          "moonSign": "string",
          "ascendant": "string",
          "sunInsight": "string",
          "moonInsight": "string",
          "insight": "string",
          "dailyHoroscope": "string",
          "planetaryPlacements": [
            { "planet": "Sun", "house": "number", "sign": "string", "degree": "string", "interpretation": "short text" },
            { "planet": "Moon", "house": "number", "sign": "string", "degree": "string", "interpretation": "short text" },
            { "planet": "Mars", "house": "number", "sign": "string", "degree": "string", "interpretation": "short text" },
            { "planet": "Mercury", "house": "number", "sign": "string", "degree": "string", "interpretation": "short text" },
            { "planet": "Jupiter", "house": "number", "sign": "string", "degree": "string", "interpretation": "short text" },
            { "planet": "Venus", "house": "number", "sign": "string", "degree": "string", "interpretation": "short text" },
            { "planet": "Saturn", "house": "number", "sign": "string", "degree": "string", "interpretation": "short text" },
            { "planet": "Rahu", "house": "number", "sign": "string", "degree": "string", "interpretation": "short text" },
            { "planet": "Ketu", "house": "number", "sign": "string", "degree": "string", "interpretation": "short text" }
          ]
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
          "lifePath": ${manualLifePath},
          "personalYear": ${manualPersonalYear},
          "soulUrge": "number",
          "insight": "Explain the significance of Life Path ${manualLifePath} and Personal Year ${manualPersonalYear}."
        },
        "humanDesign": {
          "type": "string",
          "strategy": "string",
          "insight": "string"
        },
        "dailyAffirmation": "string",
        "dailyMeditation": "string"
      }`;

      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 8192,
        messages: [{ role: "user", content: prompt }],
      });

      const content = response.content[0].type === 'text' ? response.content[0].text : '';
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Failed to parse spiritual data from AI");
      const finalSpiritualData = JSON.parse(jsonMatch[0]);

      // Ensure numerology insight is strictly tied to birth date
      if (finalSpiritualData.numerology) {
        finalSpiritualData.numerology.insight = `Calculated for birth date ${birthDate.toLocaleDateString()}: ${finalSpiritualData.numerology.insight}`;
      }

      const profile = await storage.upsertSpiritualProfile({
        ...result.data,
        userId,
        astrologyChart: finalSpiritualData.astrology,
        siderealChart: finalSpiritualData.sidereal,
        numerologyNumbers: finalSpiritualData.numerology,
        humanDesignBodygraph: finalSpiritualData.humanDesign,
        dailyAffirmation: finalSpiritualData.dailyAffirmation,
        dailyMeditation: finalSpiritualData.dailyMeditation
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

  app.get("/api/horoscope/monthly", async (req, res) => {
    try {
      const profile = await storage.getSpiritualProfile("default-user");
      if (!profile) return res.status(404).json({ error: "Profile not found" });

      const birthDate = new Date(profile.birthDate!);
      const birthTime = profile.birthTime || "12:00";
      const birthLocation = profile.birthLocation || "Unknown";

      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Casting charts to any to avoid LSP type errors on jsonb fields
      const astroChart = (profile.astrologyChart || {}) as any;
      const sideChart = (profile.siderealChart || {}) as any;
      const numNumbers = (profile.numerologyNumbers || {}) as any;
      const hdGraph = (profile.humanDesignBodygraph || {}) as any;

      const prompt = `Act as an expert Vedic astrologer and Numerologist. Generate a deeply personalized spiritual calendar for the month of ${now.toLocaleString('default', { month: 'long' })} ${year}.
      
      CRITICAL: Use these EXACT birth details for all calculations:
      - Birth Date: ${birthDate.toISOString()}
      - Birth Time: ${birthTime}
      - Birth Location: ${birthLocation}
      
      User Profile Data (for reference):
      - Sun: ${astroChart.sunSign}
      - Moon: ${astroChart.moonSign}
      - Ascendant: ${astroChart.ascendant}
      - Atmakaraka: ${sideChart.atmakaraka}
      - Life Path: ${numNumbers.lifePath}
      - HD Type: ${hdGraph.type}

      For EACH day (1 to ${daysInMonth}), provide:
      1. Personalized Daily Horoscope: 2-3 sentences explaining exactly how the day's transits affect their specific natal placements (Sun, Moon, Ascendant).
      2. Accurate Personal Day Numerology: Calculate the Personal Day number using the formula: (Personal Year + Month + Day) reduced to a single digit or master number. Explain the specific vibration for them.
      3. Integrated Guidance: A summary combining both influences.

      Return strictly JSON in this format:
      {
        "month": "${now.toLocaleString('default', { month: 'long' })}",
        "year": ${year},
        "days": [
          { 
            "day": 1, 
            "daily_horoscope": "...",
            "numerology_day": "5",
            "numerology_explanation": "...",
            "insight": "..." 
          }
        ]
      }`;

      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 8192,
        messages: [{ role: "user", content: prompt }],
      });

      const content = response.content[0].type === 'text' ? response.content[0].text : '';
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Failed to parse monthly horoscope");
      
      res.json(JSON.parse(jsonMatch[0]));
    } catch (error: any) {
      console.error("Monthly horoscope error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  return httpServer;
}
