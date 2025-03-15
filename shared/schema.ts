import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // "dog", "cat", "small"
  breed: text("breed").notNull(),
  age: integer("age").notNull(), // age in months
  gender: text("gender").notNull(), // "male", "female"
  size: text("size").notNull(), // "small", "medium", "large"
  personality: text("personality").notNull(),
  status: text("status").notNull(), // "available", "adopted", "pending"
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPetSchema = createInsertSchema(pets).omit({ 
  id: true 
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPet = z.infer<typeof insertPetSchema>;
export type Pet = typeof pets.$inferSelect;
