import { sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const testimonials = pgTable("testimonials", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  company: text("company").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  rating: integer("rating").notNull().default(5),
  isActive: boolean("is_active").notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export async function up(db: any) {
  await db.schema.createTable(testimonials);
}

export async function down(db: any) {
  await db.schema.dropTable(testimonials);
} 