import {
  users,
  services,
  aboutContent,
  stats,
  appFeatures,
  courses,
  news,
  events,
  teamMembers,
  faqs,
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
  type Course,
  type InsertCourse,
  type News,
  type InsertNews,
  type Event,
  type InsertEvent,
  type TeamMember,
  type InsertTeamMember,
  type Faq,
  type InsertFaq,
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

  // Course operations
  getAllCourses(): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course>;
  deleteCourse(id: number): Promise<void>;

  // News operations
  getAllNews(): Promise<News[]>;
  createNews(news: InsertNews): Promise<News>;
  updateNews(id: number, news: Partial<InsertNews>): Promise<News>;
  deleteNews(id: number): Promise<void>;

  // Event operations
  getAllEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event>;
  deleteEvent(id: number): Promise<void>;

  // Team member operations
  getAllTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember>;
  deleteTeamMember(id: number): Promise<void>;

  // FAQ operations
  getAllFaqs(): Promise<Faq[]>;
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

  // Course operations
  async getAllCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db
      .insert(courses)
      .values(course)
      .returning();
    return newCourse;
  }

  async updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course> {
    const [updatedCourse] = await db
      .update(courses)
      .set({ ...course, updatedAt: new Date() })
      .where(eq(courses.id, id))
      .returning();
    return updatedCourse;
  }

  async deleteCourse(id: number): Promise<void> {
    await db.delete(courses).where(eq(courses.id, id));
  }

  // News operations
  async getAllNews(): Promise<News[]> {
    return await db.select().from(news);
  }

  async createNews(newsData: InsertNews): Promise<News> {
    const [newNews] = await db
      .insert(news)
      .values(newsData)
      .returning();
    return newNews;
  }

  async updateNews(id: number, newsData: Partial<InsertNews>): Promise<News> {
    const [updatedNews] = await db
      .update(news)
      .set({ ...newsData, updatedAt: new Date() })
      .where(eq(news.id, id))
      .returning();
    return updatedNews;
  }

  async deleteNews(id: number): Promise<void> {
    await db.delete(news).where(eq(news.id, id));
  }

  // Event operations
  async getAllEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db
      .insert(events)
      .values(event)
      .returning();
    return newEvent;
  }

  async updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event> {
    const [updatedEvent] = await db
      .update(events)
      .set({ ...event, updatedAt: new Date() })
      .where(eq(events.id, id))
      .returning();
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<void> {
    await db.delete(events).where(eq(events.id, id));
  }

  // Team member operations
  async getAllTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers);
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db
      .insert(teamMembers)
      .values(member)
      .returning();
    return newMember;
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember> {
    const [updatedMember] = await db
      .update(teamMembers)
      .set({ ...member, updatedAt: new Date() })
      .where(eq(teamMembers.id, id))
      .returning();
    return updatedMember;
  }

  async deleteTeamMember(id: number): Promise<void> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }

  // FAQ operations
  async getAllFaqs(): Promise<Faq[]> {
    return await db.select().from(faqs);
  }
}

export const storage = new DatabaseStorage();
