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

  const reduce = (n: number): number => {
    let s = n;
    while (s > 9 && s !== 11 && s !== 22 && s !== 33) {
      s = s.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
    }
    return s;
  };

  const calculateLifePath = (date: Date): number => {
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return reduce(reduce(month) + reduce(day) + reduce(year));
  };

  const calculatePersonalYear = (birthDate: Date, targetDate: Date): number => {
    const day = birthDate.getUTCDate();
    const month = birthDate.getUTCMonth() + 1;
    const currentYear = targetDate.getUTCFullYear();
    return reduce(reduce(month) + reduce(day) + reduce(currentYear));
  };

  app.get("/api/profile", async (req, res) => {
    const profile = await storage.getSpiritualProfile("default-user");
    res.json({ ...(profile || {}), isPremium: true });
  });

  app.post("/api/profile", async (req, res) => {
    try {
      console.log("POST /api/profile request body:", JSON.stringify(req.body));
      
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
      
      try {
        const user = await storage.getUser(userId);
        if (!user) {
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

      const lifePath = calculateLifePath(birthDate);
      const personalYear = calculatePersonalYear(birthDate, new Date());

      const VEDIC_API_KEY = process.env.VEDIC_ASTRO_API_KEY;
      let vedicPlanets: any[] = [];
      let ashtakData: any = null;
      let nakshatraData: any = null;
      let mangalInfo = "";

      if (VEDIC_API_KEY) {
        try {
          const defaultLat = "45.9636";
          const defaultLon = "-66.6431";
          const defaultTz = "-4";

          const vedaParams = new URLSearchParams({
            api_key: VEDIC_API_KEY,
            dob: `${birthDate.getUTCDate().toString().padStart(2, '0')}/${(birthDate.getUTCMonth() + 1).toString().padStart(2, '0')}/${birthDate.getUTCFullYear()}`,
            tob: birthTime,
            lat: defaultLat,
            lon: defaultLon,
            tz: defaultTz,
            lang: "en"
          });

          const [vedaRes, mangalRes, ashtakRes, nakshatraRes] = await Promise.all([
            fetch(`https://api.vedicastroapi.com/v3-0/horoscope/planet-details?${vedaParams.toString()}`),
            fetch(`https://api.vedicastroapi.com/v3-0/dosha/mangal-dosh?${vedaParams.toString()}`),
            fetch(`https://api.vedicastroapi.com/v3-0/horoscope/ashtakvarga?${vedaParams.toString()}`),
            fetch(`https://api.vedicastroapi.com/v3-0/horoscope/nakshatra-details?${vedaParams.toString()}`)
          ]);
          
          const vedaJson = await vedaRes.json();
          const mangalJson = await mangalRes.json();
          const ashtakJson = await ashtakRes.json();
          const nakshatraJson = await nakshatraRes.json();
          
          if (vedaJson.status === 200) {
            vedicPlanets = vedaJson.response;
          }
          if (ashtakJson.status === 200) ashtakData = ashtakJson.response;
          if (nakshatraJson.status === 200) nakshatraData = nakshatraJson.response;
          if (mangalJson.status === 200) {
            mangalInfo = mangalJson.response.has_mangal_dosha 
              ? `Manglik: ${mangalJson.response.type}` 
              : "Non-Manglik";
          }
        } catch (apiError) {
          console.error("Vedic API Error:", apiError);
        }
      }

      const vedicPlanetSummary = vedicPlanets.length > 0 
        ? vedicPlanets.map((p: any) => `${p.name}: ${p.sign} (House ${p.house}, ${Math.floor(p.full_degree % 30)}°)`).join(", ")
        : "No API data available";

      const prompt = `You are an expert Vedic astrologer, Western astrologer, Numerologist, and Human Design analyst.

BIRTH DETAILS (USE THESE EXACTLY FOR ALL CALCULATIONS):
- Date: ${birthDate.toISOString().split('T')[0]}
- Time: ${birthTime}
- Location: ${birthLocation}
- Current Date: ${new Date().toISOString().split('T')[0]}

${vedicPlanets.length > 0 ? `VEDIC API DATA (Sidereal positions from VedicAstroAPI - use these as reference):
${vedicPlanetSummary}
Mangal Dosha: ${mangalInfo}` : "No Vedic API data available. Calculate all Sidereal positions based on the birth details above using Lahiri Ayanamsa."}

NUMEROLOGY (PRE-CALCULATED, USE EXACTLY):
- Life Path: ${lifePath}
- Personal Year (${new Date().getUTCFullYear()}): ${personalYear}

INSTRUCTIONS:
1. WESTERN ASTROLOGY (Tropical/Seasonal zodiac): Calculate Sun, Moon, and Ascendant using the TROPICAL zodiac based on the birth details above. Provide detailed personality insights for each placement.
2. VEDIC ASTROLOGY (Sidereal/Lahiri): Calculate or use the API data above for all 9 planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) with sign, house, degree, and a 2-3 sentence personal interpretation of what that placement means for this person.
3. NUMEROLOGY: Life Path is EXACTLY ${lifePath}. Personal Year is EXACTLY ${personalYear}. Calculate Soul Urge number from the full birth name vibration. Provide deep insights.
4. HUMAN DESIGN: Determine the Human Design type based on birth details. Provide type, strategy, and insight.
5. DAILY: Generate today's horoscope (2-3 sentences), a personalized affirmation, and a meditation focus.

Return ONLY valid JSON in this exact structure (replace all placeholder values with actual calculated data):
{
  "western": {
    "sunSign": "calculated tropical sun sign",
    "moonSign": "calculated tropical moon sign",
    "ascendant": "calculated tropical ascendant",
    "sunDescription": "2-3 sentence description of this Sun placement and what it means for this person",
    "moonDescription": "2-3 sentence description of this Moon placement and what it means",
    "ascendantDescription": "2-3 sentence description of this Rising sign and what it means",
    "overview": "3-4 sentence synthesis of the full Western chart"
  },
  "astrology": {
    "sunSign": "calculated sidereal sun sign",
    "moonSign": "calculated sidereal moon sign",
    "ascendant": "calculated sidereal ascendant",
    "sunInsight": "Detailed insight about the Sidereal Sun placement",
    "moonInsight": "Detailed insight about the Sidereal Moon placement",
    "insight": "Overall Vedic chart synthesis",
    "dailyHoroscope": "Today's personalized horoscope 2-3 sentences",
    "planetaryPlacements": [
      {"planet": "Sun", "house": 0, "sign": "sign", "degree": "X°", "interpretation": "2-3 sentences about what this Sun placement means for this person"},
      {"planet": "Moon", "house": 0, "sign": "sign", "degree": "X°", "interpretation": "2-3 sentences"},
      {"planet": "Mars", "house": 0, "sign": "sign", "degree": "X°", "interpretation": "2-3 sentences"},
      {"planet": "Mercury", "house": 0, "sign": "sign", "degree": "X°", "interpretation": "2-3 sentences"},
      {"planet": "Jupiter", "house": 0, "sign": "sign", "degree": "X°", "interpretation": "2-3 sentences"},
      {"planet": "Venus", "house": 0, "sign": "sign", "degree": "X°", "interpretation": "2-3 sentences"},
      {"planet": "Saturn", "house": 0, "sign": "sign", "degree": "X°", "interpretation": "2-3 sentences"},
      {"planet": "Rahu", "house": 0, "sign": "sign", "degree": "X°", "interpretation": "2-3 sentences"},
      {"planet": "Ketu", "house": 0, "sign": "sign", "degree": "X°", "interpretation": "2-3 sentences"}
    ]
  },
  "sidereal": {
    "atmakaraka": "calculated atmakaraka planet",
    "lagnam": "calculated sidereal ascendant",
    "rahu": "calculated rahu sign",
    "ketu": "calculated ketu sign",
    "atmakarakaInsight": "2-3 sentences about the Atmakaraka planet",
    "lagnamInsight": "2-3 sentences about the Lagnam/Ascendant",
    "rahuInsight": "2-3 sentences about Rahu's position",
    "ketuInsight": "2-3 sentences about Ketu's position"
  },
  "numerology": {
    "lifePath": ${lifePath},
    "personalYear": ${personalYear},
    "soulUrge": 0,
    "insight": "Deep 3-4 sentence analysis of Life Path ${lifePath} combined with Personal Year ${personalYear}"
  },
  "humanDesign": {
    "type": "calculated HD type",
    "strategy": "calculated strategy",
    "insight": "2-3 sentences about this Human Design type"
  },
  "dailyAffirmation": "A powerful personalized affirmation",
  "dailyMeditation": "2-3 sentence meditation guidance"
}`;

      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 8192,
        messages: [{ role: "user", content: prompt }],
      });

      const content = response.content[0].type === 'text' ? response.content[0].text : '';
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Failed to parse spiritual data from AI");
      const finalData = JSON.parse(jsonMatch[0]);

      const defaultWestern = {
        sunSign: "Unknown", moonSign: "Unknown", ascendant: "Unknown",
        sunDescription: "Western Sun data unavailable.", moonDescription: "Western Moon data unavailable.",
        ascendantDescription: "Western Ascendant data unavailable.", overview: "Western chart data unavailable."
      };
      if (!finalData.western) finalData.western = defaultWestern;
      else finalData.western = { ...defaultWestern, ...finalData.western };

      const defaultAstrology = {
        sunSign: "Unknown", moonSign: "Unknown", ascendant: "Unknown",
        sunInsight: "Vedic Sun data unavailable.", moonInsight: "Vedic Moon data unavailable.",
        insight: "Vedic chart data unavailable.", dailyHoroscope: "Daily horoscope unavailable.",
        planetaryPlacements: []
      };
      if (!finalData.astrology) finalData.astrology = defaultAstrology;
      else finalData.astrology = { ...defaultAstrology, ...finalData.astrology };

      if (Array.isArray(finalData.astrology.planetaryPlacements)) {
        finalData.astrology.planetaryPlacements = finalData.astrology.planetaryPlacements.map((p: any) => ({
          planet: p.planet || "Unknown",
          house: p.house || 0,
          sign: p.sign || "Unknown",
          degree: p.degree || "0°",
          interpretation: p.interpretation || "Interpretation unavailable."
        }));
      }

      const defaultSidereal = {
        atmakaraka: "Unknown", lagnam: "Unknown", rahu: "Unknown", ketu: "Unknown",
        atmakarakaInsight: "Atmakaraka data unavailable.", lagnamInsight: "Lagnam data unavailable.",
        rahuInsight: "Rahu data unavailable.", ketuInsight: "Ketu data unavailable."
      };
      if (!finalData.sidereal) finalData.sidereal = defaultSidereal;
      else finalData.sidereal = { ...defaultSidereal, ...finalData.sidereal };

      if (!finalData.humanDesign) finalData.humanDesign = { type: "Unknown", strategy: "Unknown", insight: "Human Design data unavailable." };
      if (!finalData.dailyAffirmation) finalData.dailyAffirmation = "I am aligned with the wisdom of the cosmos.";
      if (!finalData.dailyMeditation) finalData.dailyMeditation = "Close your eyes and breathe deeply, connecting with your inner light.";

      if (finalData.numerology) {
        finalData.numerology.lifePath = lifePath;
        finalData.numerology.personalYear = personalYear;
      } else {
        finalData.numerology = { lifePath, personalYear, soulUrge: 0, insight: "Numerology data unavailable." };
      }

      if (finalData.astrology) {
        finalData.astrology.ashtakvarga = ashtakData;
        finalData.astrology.nakshatras = nakshatraData;
      }

      const profile = await storage.upsertSpiritualProfile({
        ...result.data,
        userId,
        astrologyChart: { ...finalData.astrology, western: finalData.western },
        siderealChart: finalData.sidereal,
        numerologyNumbers: finalData.numerology,
        humanDesignBodygraph: finalData.humanDesign,
        dailyAffirmation: finalData.dailyAffirmation,
        dailyMeditation: finalData.dailyMeditation
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
      const monthParam = req.query.month ? parseInt(req.query.month as string) : new Date().getMonth();
      const yearParam = req.query.year ? parseInt(req.query.year as string) : new Date().getFullYear();

      const profile = await storage.getSpiritualProfile("default-user");
      if (!profile) return res.status(404).json({ error: "Profile not found" });

      const birthDate = new Date(profile.birthDate!);
      const birthTime = profile.birthTime || "12:00";
      const birthLocation = profile.birthLocation || "Unknown";

      const daysInMonth = new Date(yearParam, monthParam + 1, 0).getDate();
      const targetMonthDate = new Date(yearParam, monthParam, 1);

      const astroChart = (profile.astrologyChart || {}) as any;
      const sideChart = (profile.siderealChart || {}) as any;
      const numNumbers = (profile.numerologyNumbers || {}) as any;
      const hdGraph = (profile.humanDesignBodygraph || {}) as any;

      const prompt = `Act as an expert Vedic astrologer and Numerologist. Generate a deeply personalized spiritual calendar for the month of ${targetMonthDate.toLocaleString('default', { month: 'long' })} ${yearParam}.
      
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
        "month": "${targetMonthDate.toLocaleString('default', { month: 'long' })}",
        "year": ${yearParam},
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
