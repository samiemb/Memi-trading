import { sql } from "drizzle-orm";
import { pgTable, serial, integer, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { courses } from "../../shared/schema.js";

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  courseTitle: varchar("course_title", { length: 255 }).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  education: text("education").notNull(),
  experience: text("experience").notNull(),
  motivation: text("motivation").notNull(),
  status: varchar("status", { length: 50 }).default("pending"),
  enrollmentDate: timestamp("enrollment_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export async function up(db: any) {
  await db.schema.createTable(enrollments);
}

export async function down(db: any) {
  await db.schema.dropTable(enrollments);
} 