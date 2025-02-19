import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure WebSocket for Neon
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

// Create the connection pool with more robust configuration
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 10000, // Increased timeout
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle
  ssl: {
    rejectUnauthorized: false // For development environment
  }
});

// Initialize Drizzle with the pool
export const db = drizzle(pool, { schema });

// Add a more robust health check function
export const checkDatabaseConnection = async () => {
  let retries = 3;
  while (retries > 0) {
    try {
      await pool.query('SELECT 1');
      console.log('Database connection successful');
      return true;
    } catch (error) {
      console.error(`Database connection attempt failed (${retries} retries left):`, error);
      retries--;
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
      }
    }
  }
  console.error('All database connection attempts failed');
  return false;
};

// Handle cleanup on application shutdown
process.on('SIGINT', async () => {
  await pool.end();
  process.exit(0);
});