import { sql } from "drizzle-orm";

export async function up(db: any) {
  await db.execute(sql`
    ALTER TABLE testimonials DROP COLUMN company;
  `);
}

export async function down(db: any) {
  await db.execute(sql`
    ALTER TABLE testimonials ADD COLUMN company text NOT NULL;
  `);
} 