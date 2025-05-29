import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertServiceSchema, insertAboutContentSchema, insertStatSchema } from "@shared/schema";
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
