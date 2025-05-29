import {
  users,
  services,
  aboutContent,
  stats,
  appFeatures,
  type User,
  type InsertUser,
  type Service,
  type InsertService,
  type AboutContent,
  type InsertAboutContent,
  type Stat,
  type InsertStat,
  type AppFeature,
  type InsertAppFeature,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Service operations
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: number): Promise<void>;
  
  // About content operations
  getAboutContent(): Promise<AboutContent | undefined>;
  updateAboutContent(content: InsertAboutContent): Promise<AboutContent>;
  
  // Stats operations
  getAllStats(): Promise<Stat[]>;
  updateStats(statsData: InsertStat[]): Promise<Stat[]>;
  
  // App features operations
  getAllAppFeatures(): Promise<AppFeature[]>;
  createAppFeature(feature: InsertAppFeature): Promise<AppFeature>;
  updateAppFeature(id: number, feature: Partial<InsertAppFeature>): Promise<AppFeature>;
  deleteAppFeature(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Service operations
  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db
      .insert(services)
      .values(service)
      .returning();
    return newService;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service> {
    const [updatedService] = await db
      .update(services)
      .set({ ...service, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return updatedService;
  }

  async deleteService(id: number): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  // About content operations
  async getAboutContent(): Promise<AboutContent | undefined> {
    const [content] = await db.select().from(aboutContent).limit(1);
    return content || undefined;
  }

  async updateAboutContent(content: InsertAboutContent): Promise<AboutContent> {
    const existing = await this.getAboutContent();
    
    if (existing) {
      const [updated] = await db
        .update(aboutContent)
        .set({ ...content, updatedAt: new Date() })
        .where(eq(aboutContent.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(aboutContent)
        .values(content)
        .returning();
      return created;
    }
  }

  // Stats operations
  async getAllStats(): Promise<Stat[]> {
    return await db.select().from(stats);
  }

  async updateStats(statsData: InsertStat[]): Promise<Stat[]> {
    // Delete existing stats and insert new ones
    await db.delete(stats);
    
    if (statsData.length === 0) {
      return [];
    }

    return await db
      .insert(stats)
      .values(statsData)
      .returning();
  }

  // App features operations
  async getAllAppFeatures(): Promise<AppFeature[]> {
    return await db.select().from(appFeatures);
  }

  async createAppFeature(feature: InsertAppFeature): Promise<AppFeature> {
    const [newFeature] = await db
      .insert(appFeatures)
      .values(feature)
      .returning();
    return newFeature;
  }

  async updateAppFeature(id: number, feature: Partial<InsertAppFeature>): Promise<AppFeature> {
    const [updatedFeature] = await db
      .update(appFeatures)
      .set({ ...feature, updatedAt: new Date() })
      .where(eq(appFeatures.id, id))
      .returning();
    return updatedFeature;
  }

  async deleteAppFeature(id: number): Promise<void> {
    await db.delete(appFeatures).where(eq(appFeatures.id, id));
  }
}

export const storage = new DatabaseStorage();
