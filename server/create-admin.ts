import { db } from "./db.js";
import { users } from "../shared/schema.js";
import bcrypt from "bcryptjs";

async function createAdminUser() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  try {
    const [admin] = await db
      .insert(users)
      .values({
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin"
      })
      .returning();
    
    console.log("Admin user created successfully:", admin);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

createAdminUser(); 