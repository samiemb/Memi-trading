import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertServiceSchema, 
  insertAboutContentSchema, 
  insertStatSchema, 
  insertCourseSchema, 
  insertNewsSchema, 
  insertEventSchema, 
  insertTeamMemberSchema,
  insertEnrollmentSchema,
  insertTestimonialSchema
} from "../shared/schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up storage for uploaded images
const storageConfig = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    // Create an "uploads" directory in the server folder if it doesn't exist
    const uploadPath = path.join(__dirname, 'uploads');
    // Ensure the upload directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid filename conflicts
  },
});

const upload = multer({ storage: storageConfig }); // Initialize multer upload

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

  app.get('/api/app-showcase', async (req, res) => {
    try {
      const features = await storage.getAllAppFeatures();
      const showcase = {
        title: "MEMI Trading Platform",
        description: "Experience the future of trading with our advanced platform. Real-time analytics, powerful tools, and intuitive interface - all in one place.",
        features: features,
        sliderImages: [
          {
            src: "/assets/slider/slide1.jpg",
            alt: "MEMI Trading Platform Interface"
          },
          {
            src: "/assets/slider/slide2.jpg",
            alt: "Real-time Market Analysis"
          },
          {
            src: "/assets/slider/slide3.jpg",
            alt: "Advanced Trading Tools"
          },
          {
            src: "/assets/slider/slide4.jpg",
            alt: "Portfolio Management"
          }
        ]
      };
      res.json(showcase);
    } catch (error) {
      console.error('Get app showcase error:', error);
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

  app.post('/api/admin/courses', authenticateToken, upload.single('imageUrl'), async (req: Request & { file?: Express.Multer.File }, res) => {
    try {
      // req.body contains the text fields, req.file contains the uploaded file
      const { title, description, instructor, duration, level, price, category } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined; // Get the file path

      // Construct the course data object
      const courseData = insertCourseSchema.parse({
        title,
        description,
        instructor,
        duration,
        level,
        price: price.toString(), // Convert price to string for validation
        imageUrl, // Use the uploaded file path
        category,
        // enrolledStudents, rating, and isActive are optional/have defaults, so no need to include if not in form
      });

      const course = await storage.createCourse(courseData);
      res.json(course);
    } catch (error: any) {
      console.error('Create course error:', error);
      if (error.issues) {
        console.error('Validation errors:', error.issues);
        return res.status(400).json({ message: 'Invalid course data', errors: error.issues });
      }
      res.status(400).json({ message: 'Invalid course data' });
    }
  });

  app.put('/api/admin/courses/:id', authenticateToken, upload.single('imageUrl'), async (req: Request & { file?: Express.Multer.File }, res) => {
    try {
      const id = parseInt(req.params.id);
      const { title, description, instructor, duration, level, price, category } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

      // Construct the course data object
      const courseData = insertCourseSchema.partial().parse({
        title,
        description,
        instructor,
        duration,
        level,
        price: price ? price.toString() : undefined,
        imageUrl,
        category,
      });

      const course = await storage.updateCourse(id, courseData);
      res.json(course);
    } catch (error: any) {
      console.error('Update course error:', error);
      if (error.issues) {
        console.error('Validation errors:', error.issues);
        return res.status(400).json({ message: 'Invalid course data', errors: error.issues });
      }
      res.status(400).json({ message: 'Invalid course data' });
    }
  });

  app.delete('/api/admin/courses/:id', authenticateToken, async (req, res) => {
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

  app.post('/api/admin/news', authenticateToken, upload.single('imageUrl'), async (req: Request & { file?: Express.Multer.File }, res) => {
    try {
      const { title, excerpt, content, author, category } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined; // Get the file path

      const newsData = insertNewsSchema.parse({
        title,
        excerpt,
        content,
        author,
        category,
        imageUrl, // Use the uploaded file path
        // publishedAt and isPublished have defaults, no need to include if not in form
      });

      const news = await storage.createNews(newsData);
      res.json(news);
    } catch (error: any) {
      console.error('Create news error:', error);
      if (error.issues) {
        console.error('Validation errors:', error.issues);
        return res.status(400).json({ message: 'Invalid news data', errors: error.issues });
      }
      res.status(400).json({ message: 'Invalid news data' });
    }
  });

  app.put('/api/admin/news/:id', authenticateToken, upload.single('imageUrl'), async (req: Request & { file?: Express.Multer.File }, res) => {
    try {
      const id = parseInt(req.params.id);
      const { title, excerpt, content, author, category } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined; // Get the file path if a new file is uploaded

      const newsData = insertNewsSchema.partial().parse({
        title,
        excerpt,
        content,
        author,
        category,
        // Only include imageUrl in the update data if a new file was uploaded
        ...(imageUrl !== undefined && { imageUrl }),
        // publishedAt and isPublished can be included if they are in the form and need updating
      });

      const news = await storage.updateNews(id, newsData);
      res.json(news);
    } catch (error: any) {
      console.error('Update news error:', error);
      if (error.issues) {
        console.error('Validation errors:', error.issues);
        return res.status(400).json({ message: 'Invalid news data', errors: error.issues });
      }
      res.status(400).json({ message: 'Invalid news data' });
    }
  });

  app.delete('/api/admin/news/:id', authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteNews(id);
      res.json({ message: 'News deleted successfully' });
    } catch (error) {
      console.error('Delete news error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Event CRUD routes
  app.get('/api/events', async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error('Get events error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/admin/events', authenticateToken, upload.single('imageUrl'), async (req: Request & { file?: Express.Multer.File }, res) => {
    try {
      console.log('Received request body:', req.body);

      const { title, description, eventDate, location, registrationFee, capacity, organizer, category } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

      console.log('Received eventDate:', eventDate);

      const eventData = insertEventSchema.parse({
        title,
        description,
        eventDate,
        location,
        registrationFee: registrationFee ? parseFloat(registrationFee) : undefined,
        capacity: capacity ? parseInt(capacity) : undefined,
        organizer,
        category,
        imageUrl,
        isActive: true
      });

      const event = await storage.createEvent(eventData);
      res.json(event);
    } catch (error: any) {
      console.error('Create event error:', error);
      if (error.issues) {
        console.error('Validation errors:', error.issues);
        return res.status(400).json({ message: 'Invalid event data', errors: error.issues });
      }
      res.status(400).json({ message: 'Invalid event data' });
    }
  });

  app.put('/api/admin/events/:id', authenticateToken, upload.single('imageUrl'), async (req: Request & { file?: Express.Multer.File }, res) => {
    try {
      const id = parseInt(req.params.id);
      const { title, description, date, location, price, capacity, organizer, category } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined; // Get the file path if a new file is uploaded

      const eventData = insertEventSchema.partial().parse({
        title,
        description,
        date, // Assuming date is sent in a format compatible with schema validation
        location,
        price, // Assuming price is sent in a format compatible with schema validation
        capacity: capacity ? parseInt(capacity) : undefined, // Convert capacity if provided
        organizer,
        category,
        // Only include imageUrl in the update data if a new file was uploaded
        ...(imageUrl !== undefined && { imageUrl }),
        // endDate, isActive, registeredAttendees can be included if they are in the form and need updating
      });

      const event = await storage.updateEvent(id, eventData);
      res.json(event);
    } catch (error: any) {
      console.error('Update event error:', error);
      if (error.issues) {
        console.error('Validation errors:', error.issues);
        return res.status(400).json({ message: 'Invalid event data', errors: error.issues });
      }
      res.status(400).json({ message: 'Invalid event data' });
    }
  });

  app.delete('/api/admin/events/:id', authenticateToken, async (req, res) => {
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

  app.post('/api/admin/team', authenticateToken, upload.single('imageUrl'), async (req: Request & { file?: Express.Multer.File }, res) => {
    try {
      // req.body contains the text fields, req.file contains the uploaded file
      const { name, position, bio, email, phone, department } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined; // Get the file path after upload

      const teamData = insertTeamMemberSchema.parse({
        name,
        position,
        bio, // Use the bio field directly
        email,
        phone,
        imageUrl, // Use the uploaded image URL
        department,
        isActive: true, // Set required boolean field
        // Optional fields from schema with default values can be omitted or set explicitly
        // joinDate: new Date(),
        // displayOrder: 0,
      });

      const member = await storage.createTeamMember(teamData);
      res.json(member);
    } catch (error: any) {
      console.error('Create team member error:', error);
      if (error.issues) {
        console.error('Validation errors:', error.issues);
        return res.status(400).json({ message: 'Invalid team member data', errors: error.issues });
      }
      res.status(400).json({ message: 'Invalid team member data' });
    }
  });

  app.put('/api/admin/team/:id', authenticateToken, upload.single('imageUrl'), async (req: Request & { file?: Express.Multer.File }, res) => {
    try {
      const id = parseInt(req.params.id);
      // req.body contains the text fields, req.file contains the uploaded file
      const { name, position, bio, email, phone, department } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined; // Get the file path after upload

      const teamData = insertTeamMemberSchema.partial().parse({
        name,
        position,
        bio, // Use the bio field directly
        email,
        phone,
        imageUrl, // Use the uploaded image URL
        department,
        // isActive, joinDate, displayOrder can be included if they are in the form and need updating
      });

      const member = await storage.updateTeamMember(id, teamData);
      res.json(member);
    } catch (error) {
      console.error('Update team member error:', error);
      res.status(400).json({ message: 'Invalid team member data' });
    }
  });

  app.delete('/api/admin/team/:id', authenticateToken, async (req, res) => {
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

  app.post('/api/admin/faqs', authenticateToken, async (req, res) => {
    try {
      const { question, answer, category, isActive } = req.body;
      
      if (!question || !answer || !category) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const faq = await storage.createFAQ({
        question,
        answer,
        category,
        isActive: isActive ?? true,
      });

      res.json(faq);
    } catch (error) {
      console.error('Create FAQ error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/api/admin/faqs/:id', authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { question, answer, category, isActive } = req.body;
      
      if (!question || !answer || !category) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const faq = await storage.updateFAQ(id, {
        question,
        answer,
        category,
        isActive: isActive ?? true,
      });

      res.json(faq);
    } catch (error) {
      console.error('Update FAQ error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.delete('/api/admin/faqs/:id', authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteFAQ(id);
      res.json({ message: 'FAQ deleted successfully' });
    } catch (error) {
      console.error('Delete FAQ error:', error);
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

  // Enrollment routes
  app.post('/api/enrollments', async (req, res) => {
    try {
      const enrollmentData = insertEnrollmentSchema.parse(req.body);
      const enrollment = await storage.createEnrollment(enrollmentData);
      res.json(enrollment);
    } catch (error: any) {
      console.error('Create enrollment error:', error);
      if (error.issues) {
        console.error('Validation errors:', error.issues);
        return res.status(400).json({ message: 'Invalid enrollment data', errors: error.issues });
      }
      res.status(400).json({ message: 'Invalid enrollment data' });
    }
  });

  app.get('/api/enrollments', async (req, res) => {
    try {
      const enrollments = await storage.getEnrollments();
      // Add cache control headers
      res.set('Cache-Control', 'public, max-age=30'); // Cache for 30 seconds
      res.set('ETag', `"${Date.now()}"`); // Add ETag for caching
      res.json(enrollments);
    } catch (error) {
      console.error('Get enrollments error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/api/admin/enrollments/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const enrollment = await storage.updateEnrollmentStatus(parseInt(id), status);
      res.json(enrollment);
    } catch (error) {
      console.error('Update enrollment error:', error);
      res.status(500).json({ message: 'Failed to update enrollment' });
    }
  });

  app.delete('/api/admin/enrollments/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid enrollment ID" });
      }

      await storage.deleteEnrollment(id);
      
      // Set cache control headers
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      res.json({ message: "Enrollment deleted successfully" });
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      res.status(500).json({ error: "Failed to delete enrollment" });
    }
  });

  app.get('/api/admin/enrollments', authenticateToken, async (req, res) => {
    try {
      const enrollments = await storage.getEnrollments();
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
      res.json(enrollments);
    } catch (error) {
      console.error('Get enrollments error:', error);
      res.status(500).json({ message: 'Failed to fetch enrollments' });
    }
  });

  // App Showcase admin routes
  app.put('/api/admin/app-showcase', authenticateToken, async (req, res) => {
    try {
      const { title, description, features, sliderImages } = req.body;
      
      // Validate the data
      if (!title || !description || !Array.isArray(features) || !Array.isArray(sliderImages)) {
        return res.status(400).json({ message: 'Invalid showcase data' });
      }

      // Update the showcase content in storage
      const updatedShowcase = await storage.updateAppShowcase({
        title,
        description,
        features,
        sliderImages
      });

      res.json(updatedShowcase);
    } catch (error) {
      console.error('Update app showcase error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/api/admin/app-showcase', authenticateToken, async (req, res) => {
    try {
      const showcase = await storage.getAppShowcase();
      res.json(showcase);
    } catch (error) {
      console.error('Get app showcase error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Testimonial routes
  app.get('/api/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error('Get testimonials error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/admin/testimonials', authenticateToken, upload.single('imageUrl'), async (req: Request & { file?: Express.Multer.File }, res) => {
    try {
      const { name, position, content, rating, isActive, displayOrder } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

      const testimonialData = insertTestimonialSchema.parse({
        name,
        position,
        content,
        imageUrl,
        rating: rating ? parseInt(rating) : 5,
        isActive: isActive === 'true',
        displayOrder: displayOrder ? parseInt(displayOrder) : 0,
      });

      const testimonial = await storage.createTestimonial(testimonialData);
      res.json(testimonial);
    } catch (error: any) {
      console.error('Create testimonial error:', error);
      if (error.issues) {
        return res.status(400).json({ message: 'Invalid testimonial data', errors: error.issues });
      }
      res.status(400).json({ message: 'Invalid testimonial data' });
    }
  });

  app.put('/api/admin/testimonials/:id', authenticateToken, upload.single('imageUrl'), async (req: Request & { file?: Express.Multer.File }, res) => {
    try {
      const id = parseInt(req.params.id);
      const { name, position, content, rating, isActive, displayOrder } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

      const testimonialData = insertTestimonialSchema.partial().parse({
        name,
        position,
        content,
        imageUrl,
        rating: rating ? parseInt(rating) : undefined,
        isActive: isActive === 'true',
        displayOrder: displayOrder ? parseInt(displayOrder) : undefined,
      });

      const testimonial = await storage.updateTestimonial(id, testimonialData);
      res.json(testimonial);
    } catch (error: any) {
      console.error('Update testimonial error:', error);
      if (error.issues) {
        return res.status(400).json({ message: 'Invalid testimonial data', errors: error.issues });
      }
      res.status(400).json({ message: 'Invalid testimonial data' });
    }
  });

  app.delete('/api/admin/testimonials/:id', authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTestimonial(id);
      res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
      console.error('Delete testimonial error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
