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
  enrollments,
  appShowcase,
  testimonials,
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
  type Enrollment,
  type InsertEnrollment,
  type AppShowcase,
  type InsertAppShowcase,
  type Testimonial,
  type InsertTestimonial,
} from "../shared/schema.ts";
import { db } from "./db.js";
import { eq, desc } from "drizzle-orm";

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
  createFAQ(data: {
    question: string;
    answer: string;
    category: string;
    isActive?: boolean;
  }): Promise<Faq>;
  updateFAQ(id: number, data: {
    question: string;
    answer: string;
    category: string;
    isActive?: boolean;
  }): Promise<Faq>;
  deleteFAQ(id: number): Promise<void>;

  // Enrollment operations
  createEnrollment(data: InsertEnrollment): Promise<Enrollment>;
  getEnrollments(): Promise<Enrollment[]>;
  updateEnrollmentStatus(id: number, status: string): Promise<Enrollment>;
  deleteEnrollment(id: number): Promise<void>;
  
  // App Showcase operations
  getAppShowcase(): Promise<AppShowcase | undefined>;
  updateAppShowcase(data: Partial<InsertAppShowcase>): Promise<AppShowcase>;

  // Testimonial operations
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(data: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, data: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: number): Promise<void>;
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
    // First delete all enrollments for this course
    await db.delete(enrollments).where(eq(enrollments.courseId, id));
    // Then delete the course
    await db.delete(courses).where(eq(courses.id, id));
  }

  // News operations
  async getAllNews(): Promise<News[]> {
    return await db.select().from(news).orderBy(desc(news.createdAt));
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
    return await db.select().from(events).orderBy(desc(events.eventDate));
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
    return await db.select().from(faqs).orderBy(faqs.displayOrder);
  }

  async createFAQ(data: {
    question: string;
    answer: string;
    category: string;
    isActive?: boolean;
  }): Promise<Faq> {
    const [faq] = await db.insert(faqs).values({
      question: data.question,
      answer: data.answer,
      category: data.category,
      isActive: data.isActive ?? true,
      displayOrder: 0,
    }).returning();
    return faq;
  }

  async updateFAQ(id: number, data: {
    question: string;
    answer: string;
    category: string;
    isActive?: boolean;
  }): Promise<Faq> {
    const [faq] = await db
      .update(faqs)
      .set({
        question: data.question,
        answer: data.answer,
        category: data.category,
        isActive: data.isActive ?? true,
        updatedAt: new Date(),
      })
      .where(eq(faqs.id, id))
      .returning();
    return faq;
  }

  async deleteFAQ(id: number): Promise<void> {
    await db.delete(faqs).where(eq(faqs.id, id));
  }

  // Enrollment operations
  async createEnrollment(data: InsertEnrollment): Promise<Enrollment> {
    const [enrollment] = await db
      .insert(enrollments)
      .values(data)
      .returning();
    return enrollment;
  }

  async getEnrollments(): Promise<Enrollment[]> {
    return await db.select().from(enrollments).orderBy(desc(enrollments.createdAt));
  }

  async updateEnrollmentStatus(id: number, status: string): Promise<Enrollment> {
    const [updatedEnrollment] = await db
      .update(enrollments)
      .set({ status, updatedAt: new Date() })
      .where(eq(enrollments.id, id))
      .returning();
    return updatedEnrollment;
  }

  async deleteEnrollment(id: number): Promise<void> {
    console.log('Attempting to delete enrollment with ID:', id);
    try {
      const result = await db.delete(enrollments).where(eq(enrollments.id, id));
      console.log('Delete result:', result);
    } catch (error) {
      console.error('Error deleting enrollment:', error);
      throw error;
    }
  }
  
  // App Showcase operations
  async getAppShowcase(): Promise<AppShowcase | undefined> {
    const [showcase] = await db.select().from(appShowcase).limit(1);
    return showcase;
  }

  async updateAppShowcase(data: Partial<InsertAppShowcase>): Promise<AppShowcase> {
    console.log('Received data for updateAppShowcase:', JSON.stringify(data, null, 2));
    const existing = await this.getAppShowcase();

    if (existing) {
      try {
        const [updated] = await db
          .update(appShowcase)
          .set({
            ...data,
            updatedAt: new Date(),
          })
          .where(eq(appShowcase.id, existing.id))
          .returning();

        if (!updated) {
          console.error("Failed to update app showcase: Update returned no data.");
          throw new Error("Failed to update app showcase: Update returned no data.");
        }
        console.log('Successfully updated app showcase.');
        return updated;
      } catch (error) {
        console.error('Error updating app showcase in database:', error);
        throw error;
      }
    } else {
      console.log('No existing app showcase found, attempting to create.');
      if (data.title === undefined || data.description === undefined || data.features === undefined || data.sliderImages === undefined) {
        console.error("Missing required fields to create app showcase");
        throw new Error("Missing required fields to create app showcase");
      }

      try {
        const [created] = await db
          .insert(appShowcase)
          .values({
            title: data.title,
            description: data.description,
            features: data.features as any,
            sliderImages: data.sliderImages as any,
          })
          .returning();

        if (!created) {
          console.error("Failed to create app showcase: Insert returned no data.");
          throw new Error("Failed to create app showcase: Insert returned no data.");
        }
        console.log('Successfully created app showcase.');
        return created;
      } catch (error) {
        console.error('Error creating app showcase in database:', error);
        throw error;
      }
    }
  }

  // Testimonial operations
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(desc(testimonials.displayOrder));
  }

  async createTestimonial(data: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(data).returning();
    return testimonial;
  }

  async updateTestimonial(id: number, data: Partial<InsertTestimonial>): Promise<Testimonial> {
    const [testimonial] = await db
      .update(testimonials)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(testimonials.id, id))
      .returning();
    return testimonial;
  }

  async deleteTestimonial(id: number): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }
}

export const storage = new DatabaseStorage();
