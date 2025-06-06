import fs from 'fs';
import path from 'path';
import { config } from '../config';
import { logger } from './logger';

export async function ensureDirectories() {
  const directories = [
    config.upload.uploadDir,
    'logs',
  ];

  for (const dir of directories) {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      try {
        fs.mkdirSync(dirPath, { recursive: true });
        logger.info(`Created directory: ${dir}`);
      } catch (error) {
        logger.error(`Failed to create directory ${dir}:`, error);
        throw error;
      }
    }
  }
}

export async function setup() {
  try {
    await ensureDirectories();
    logger.info('Setup completed successfully');
  } catch (error) {
    logger.error('Setup failed:', error);
    throw error;
  }
} 