import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('24h'),
  CORS_ORIGIN: z.string().default('*'),
  MAX_FILE_SIZE: z.string().default('5242880'), // 5MB
  UPLOAD_DIR: z.string().default('uploads'),
  SESSION_SECRET: z.string(),
  SESSION_MAX_AGE: z.string().default('86400000'), // 24 hours
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(8),
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

export const config = {
  nodeEnv: env.NODE_ENV,
  port: parseInt(env.PORT, 10),
  database: {
    url: env.DATABASE_URL,
    ssl: env.NODE_ENV === 'production',
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },
  cors: {
    origin: env.CORS_ORIGIN,
    credentials: true,
  },
  upload: {
    maxFileSize: parseInt(env.MAX_FILE_SIZE, 10),
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
    uploadDir: env.UPLOAD_DIR,
  },
  session: {
    secret: env.SESSION_SECRET,
    maxAge: parseInt(env.SESSION_MAX_AGE, 10),
  },
  admin: {
    email: env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
  },
} as const;

// Type for the config object
export type Config = typeof config; 