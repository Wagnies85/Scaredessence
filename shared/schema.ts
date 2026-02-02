import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, jsonb, serial, integer } from "drizzle-orm/pg-core";
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
  name: text("name"),
  birthDate: timestamp("birth_date"),
  birthTime: text("birth_time"),
  birthLocation: text("birth_location"),
  astrologyChart: jsonb("astrology_chart"),
  siderealChart: jsonb("sidereal_chart"),
  humanDesignBodygraph: jsonb("human_design_bodygraph"),
  numerologyNumbers: jsonb("numerology_numbers"),
  dailyAffirmation: text("daily_affirmation"),
  dailyMeditation: text("daily_meditation"),
});

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const insertSpiritualProfileSchema = createInsertSchema(spiritualProfiles).omit({
  id: true,
});

export type InsertSpiritualProfile = z.infer<typeof insertSpiritualProfileSchema>;
export type SpiritualProfile = typeof spiritualProfiles.$inferSelect;
