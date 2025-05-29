import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertServiceSchema, insertAboutContentSchema, insertStatSchema, insertCourseSchema, insertNewsSchema, insertEventSchema, insertTeamMemberSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware to verify JWT token
const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await storage.getUser(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/api/auth/me', authenticateToken, async (req: any, res) => {
    try {
      res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Public routes
  app.get('/api/services', async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error('Get services error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/api/about', async (req, res) => {
    try {
      const about = await storage.getAboutContent();
      res.json(about);
    } catch (error) {
      console.error('Get about error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/api/stats', async (req, res) => {
    try {
      const stats = await storage.getAllStats();
      res.json(stats);
    } catch (error) {
      console.error('Get stats error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/api/app-features', async (req, res) => {
    try {
      const features = await storage.getAllAppFeatures();
      res.json(features);
    } catch (error) {
      console.error('Get app features error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Protected admin routes
  app.post('/api/admin/services', authenticateToken, async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      res.json(service);
    } catch (error) {
      console.error('Create service error:', error);
      res.status(400).json({ message: 'Invalid service data' });
    }
  });

  app.put('/api/admin/services/:id', authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const serviceData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(id, serviceData);
      res.json(service);
    } catch (error) {
      console.error('Update service error:', error);
      res.status(400).json({ message: 'Invalid service data' });
    }
  });

  app.delete('/api/admin/services/:id', authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteService(id);
      res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error('Delete service error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/api/admin/about', authenticateToken, async (req, res) => {
    try {
      const aboutData = insertAboutContentSchema.parse(req.body);
      const about = await storage.updateAboutContent(aboutData);
      res.json(about);
    } catch (error) {
      console.error('Update about error:', error);
      res.status(400).json({ message: 'Invalid about data' });
    }
  });

  app.put('/api/admin/stats', authenticateToken, async (req, res) => {
    try {
      const statsData = req.body.map((stat: any) => insertStatSchema.parse(stat));
      const stats = await storage.updateStats(statsData);
      res.json(stats);
    } catch (error) {
      console.error('Update stats error:', error);
      res.status(400).json({ message: 'Invalid stats data' });
    }
  });

  // Courses CRUD routes
  app.get('/api/courses', async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error) {
      console.error('Get courses error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/admin/courses', authenticateToken, async (req, res) => {
    try {
      const courseData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(courseData);
      res.json(course);
    } catch (error) {
      console.error('Create course error:', error);
      res.status(400).json({ message: 'Invalid course data' });
    }
  });

  app.put('/api/admin/courses/:id', authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const courseData = insertCourseSchema.parse(req.body);
      const course = await storage.updateCourse(id, courseData);
      res.json(course);
    } catch (error) {
      console.error('Update course error:', error);
      res.status(400).json({ message: 'Invalid course data' });
    }
  });

  app.delete('/api/courses/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteCourse(id);
      res.json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error('Delete course error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // News CRUD routes
  app.get('/api/news', async (req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      console.error('Get news error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/admin/news', authenticateToken, async (req, res) => {
    try {
      const newsData = insertNewsSchema.parse(req.body);
      const news = await storage.createNews(newsData);
      res.json(news);
    } catch (error) {
      console.error('Create news error:', error);
      res.status(400).json({ message: 'Invalid news data' });
    }
  });

  app.put('/api/admin/news/:id', authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const newsData = insertNewsSchema.parse(req.body);
      const news = await storage.updateNews(id, newsData);
      res.json(news);
    } catch (error) {
      console.error('Update news error:', error);
      res.status(400).json({ message: 'Invalid news data' });
    }
  });

  app.delete('/api/news/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteNews(id);
      res.json({ message: 'News deleted successfully' });
    } catch (error) {
      console.error('Delete news error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Events CRUD routes
  app.get('/api/events', async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error('Get events error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/admin/events', authenticateToken, async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.json(event);
    } catch (error) {
      console.error('Create event error:', error);
      res.status(400).json({ message: 'Invalid event data' });
    }
  });

  app.put('/api/admin/events/:id', authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.updateEvent(id, eventData);
      res.json(event);
    } catch (error) {
      console.error('Update event error:', error);
      res.status(400).json({ message: 'Invalid event data' });
    }
  });

  app.delete('/api/events/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteEvent(id);
      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Delete event error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Team CRUD routes
  app.get('/api/team', async (req, res) => {
    try {
      const team = await storage.getAllTeamMembers();
      res.json(team);
    } catch (error) {
      console.error('Get team error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/admin/team', authenticateToken, async (req, res) => {
    try {
      const teamData = insertTeamMemberSchema.parse(req.body);
      const member = await storage.createTeamMember(teamData);
      res.json(member);
    } catch (error) {
      console.error('Create team member error:', error);
      res.status(400).json({ message: 'Invalid team member data' });
    }
  });

  app.put('/api/admin/team/:id', authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const teamData = insertTeamMemberSchema.parse(req.body);
      const member = await storage.updateTeamMember(id, teamData);
      res.json(member);
    } catch (error) {
      console.error('Update team member error:', error);
      res.status(400).json({ message: 'Invalid team member data' });
    }
  });

  app.delete('/api/team/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTeamMember(id);
      res.json({ message: 'Team member deleted successfully' });
    } catch (error) {
      console.error('Delete team member error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // FAQ routes
  app.get('/api/faqs', async (req, res) => {
    try {
      const faqs = await storage.getAllFaqs();
      res.json(faqs);
    } catch (error) {
      console.error('Get faqs error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Dashboard metrics
  app.get('/api/admin/metrics', authenticateToken, async (req, res) => {
    try {
      const services = await storage.getAllServices();
      const features = await storage.getAllAppFeatures();
      
      const metrics = {
        totalServices: services.length,
        activeUsers: 1234, // This would come from analytics
        totalInquiries: 89, // This would come from a contact form
        revenue: 25678, // This would come from payment system
      };
      
      res.json(metrics);
    } catch (error) {
      console.error('Get metrics error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
