import { execSync } from 'child_process';
import { logger } from '../server/utils/logger';

async function start() {
  try {
    logger.info('Starting production server...');

    // Check if we're in the dist directory
    if (!process.cwd().endsWith('dist')) {
      logger.error('Please run this script from the dist directory');
      process.exit(1);
    }

    // Install production dependencies
    logger.info('Installing production dependencies...');
    execSync('npm ci --production', { stdio: 'inherit' });

    // Start the server
    logger.info('Starting server...');
    execSync('node index.js', { stdio: 'inherit' });
  } catch (error) {
    logger.error('Start failed:', error);
    process.exit(1);
  }
}

start(); 