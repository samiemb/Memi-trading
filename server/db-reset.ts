import pkg from 'pg';
const { Pool } = pkg;
import { config } from './config';
import { logger } from './utils/logger';

async function resetDatabase() {
  const pool = new Pool({
    connectionString: config.database.url,
    ssl: config.database.ssl ? { rejectUnauthorized: false } : false,
  });

  try {
    // Test connection first
    const client = await pool.connect();
    logger.info('Database connection successful');

    // Drop all tables
    await client.query(`
      DROP TABLE IF EXISTS 
        about_content,
        app_features,
        app_showcase,
        courses,
        enrollments,
        events,
        faqs,
        news,
        services,
        stats,
        team_members,
        users,
        drizzle_migrations
      CASCADE;
    `);

    logger.info('All tables dropped successfully');
    client.release();
  } catch (error) {
    logger.error('Error during database reset:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the reset
resetDatabase()
  .then(() => {
    logger.info('Database reset completed');
    process.exit(0);
  })
  .catch((error) => {
    logger.error('Database reset failed:', error);
    process.exit(1);
  }); 