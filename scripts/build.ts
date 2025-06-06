import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { logger } from '../server/utils/logger';

async function build() {
  try {
    logger.info('Starting production build...');

    // Clean dist directory
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true });
    }

    // Build client
    logger.info('Building client...');
    execSync('npm run build', { stdio: 'inherit' });

    // Build server
    logger.info('Building server...');
    execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });

    // Copy necessary files
    logger.info('Copying necessary files...');
    const filesToCopy = [
      'package.json',
      'package-lock.json',
      '.env',
    ];

    for (const file of filesToCopy) {
      if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join('dist', file));
      }
    }

    // Create uploads directory
    const uploadsDir = path.join('dist', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    logger.info('Production build completed successfully!');
  } catch (error) {
    logger.error('Build failed:', error);
    process.exit(1);
  }
}

build(); 