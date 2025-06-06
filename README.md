# MEMI Trading Website

A modern, responsive website for MEMI Trading, showcasing their comprehensive services in technology, real estate, talent development, and community engagement in Tigray, Ethiopia.

## Features

- 🎨 Modern and responsive design
- 🌓 Light/Dark mode support
- 📱 Mobile-first approach
- 🔒 Secure admin dashboard
- 📊 Content management system
- 🎯 Interactive UI components
- 🌐 Social media integration
- 📝 Dynamic testimonials
- 📅 Events and news management
- 👥 Team member profiles
- 📚 Training programs showcase

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Lucide Icons
  - React Query
  - Wouter (Routing)
  - Vite (Build Tool)

- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
  - Drizzle ORM
  - Swagger (API Documentation)

## Installation and Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn package manager
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/samiemb/Memi-trading.git
cd Memi-trading
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Step 3: Set Up the Backend

1. Create a `.env` file in the server directory with the following content:
   ```env
   # Database Configuration
   DATABASE_URL=postgresql://username:password@localhost:5432/memi_db
   
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   
   # Security
   JWT_SECRET=your_jwt_secret_key
   SESSION_SECRET=your_session_secret_key
   
   # Admin Account
   ADMIN_EMAIL=admin@memi.com
   ADMIN_PASSWORD=your_secure_password
   ```

2. Create the database:
   ```bash
   # Log into PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE memi_db;
   
   # Exit psql
   \q
   ```

3. Run database migrations:
   ```bash
   cd server
   npm run db:migrate
   ```

4. Create admin user:
   ```bash
   npm run create-admin
   ```

### Step 4: Set Up the Frontend

1. Create a `.env` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:3001
   ```

### Step 5: Running the Application

1. Start both frontend and backend servers using the development script:
   ```bash
   # From the root directory
   npm run dev
   ```

   Or start them separately:
   ```bash
   # Start the backend server (from the server directory)
   cd server
   npm run dev

   # In a new terminal, start the frontend development server (from the client directory)
   cd client
   npm run dev
   ```

2. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Admin Dashboard: http://localhost:5173/admin/login
   - API Documentation: http://localhost:3001/api-docs

### Step 6: Building for Production

1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```

2. Build the backend:
   ```bash
   cd server
   npm run build
   ```

3. Start the production server:
   ```bash
   cd server
   npm start
   ```

## Project Structure

```
memi-trading/
├── client/                 # Frontend React application
│   ├── src/               # Source code
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and API
│   │   └── styles/       # Global styles
│   ├── public/           # Static assets
│   └── vercel.json       # Vercel deployment config
│
├── server/                # Backend Express application
│   ├── migrations/       # Database migrations
│   ├── middleware/       # Express middleware
│   ├── utils/           # Utility functions
│   ├── uploads/         # File upload directory
│   ├── routes.ts        # API routes
│   ├── storage.ts       # File storage handling
│   ├── db.ts           # Database configuration
│   ├── config.ts       # Server configuration
│   └── swagger.ts      # API documentation
│
├── shared/               # Shared types and utilities
├── migrations/          # Root level migrations
├── scripts/            # Utility scripts
├── uploads/            # Root level uploads
├── logs/              # Application logs
├── drizzle.config.ts  # Drizzle ORM configuration
├── vite.config.ts     # Vite configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## Troubleshooting

1. **Database Connection Issues**
   - Ensure PostgreSQL is running
   - Verify database credentials in `.env`
   - Check if the database exists

2. **Port Conflicts**
   - If port 3001 is in use, change it in the server's `.env`
   - If port 5173 is in use, Vite will automatically use the next available port

3. **Admin Access**
   - Default admin credentials are set in the server's `.env`
   - You can change them after first login

4. **File Upload Issues**
   - Ensure the `uploads` directory exists and has write permissions
   - Check file size limits in the server configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

MEMI Trading - [@Memitrading](https://x.com/Memitrading)

Project Link: [https://github.com/samiemb/Memi-trading](https://github.com/samiemb/Memi-trading) 
