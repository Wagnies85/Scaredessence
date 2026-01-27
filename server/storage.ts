import { users, type User, type InsertUser, spiritualProfiles, type SpiritualProfile, type InsertSpiritualProfile } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";
import { type Store } from "express-session";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  sessionStore: Store;
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getSpiritualProfile(userId: string): Promise<SpiritualProfile | undefined>;
  upsertSpiritualProfile(profile: InsertSpiritualProfile): Promise<SpiritualProfile>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getSpiritualProfile(userId: string): Promise<SpiritualProfile | undefined> {
    const [profile] = await db.select().from(spiritualProfiles).where(eq(spiritualProfiles.userId, userId));
    return profile;
  }

  async upsertSpiritualProfile(insertProfile: InsertSpiritualProfile): Promise<SpiritualProfile> {
    try {
      const userId = insertProfile.userId;
      if (!userId) throw new Error("userId is required for upsertSpiritualProfile");

      const [existing] = await db.select().from(spiritualProfiles).where(eq(spiritualProfiles.userId, userId));
      
      if (existing) {
        const [updated] = await db
          .update(spiritualProfiles)
          .set({
            ...insertProfile,
            astrologyChart: insertProfile.astrologyChart ?? existing.astrologyChart,
            siderealChart: insertProfile.siderealChart ?? existing.siderealChart,
            humanDesignBodygraph: insertProfile.humanDesignBodygraph ?? existing.humanDesignBodygraph,
            numerologyNumbers: insertProfile.numerologyNumbers ?? existing.numerologyNumbers,
          })
          .where(eq(spiritualProfiles.userId, userId))
          .returning();
        return updated;
      }

      const [created] = await db.insert(spiritualProfiles).values(insertProfile).returning();
      return created;
    } catch (error) {
      console.error("Database storage error in upsertSpiritualProfile:", error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();
