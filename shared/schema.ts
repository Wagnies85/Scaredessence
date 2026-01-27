import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isPremium: boolean("is_premium").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  id: true,
  username: true,
  password: true,
  isPremium: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const spiritualProfiles = pgTable("spiritual_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  birthDate: timestamp("birth_date"),
  birthTime: text("birth_time"),
  birthLocation: text("birth_location"),
  astrologyChart: jsonb("astrology_chart"),
  siderealChart: jsonb("sidereal_chart"),
  humanDesignBodygraph: jsonb("human_design_bodygraph"),
  numerologyNumbers: jsonb("numerology_numbers"),
});

export const insertSpiritualProfileSchema = createInsertSchema(spiritualProfiles).omit({
  id: true,
});

export type InsertSpiritualProfile = z.infer<typeof insertSpiritualProfileSchema>;
export type SpiritualProfile = typeof spiritualProfiles.$inferSelect;
