import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from "@shared/schema";

// Configure neon to use WebSocket
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

// Create a new pool using the serverless client with SSL configuration and proper timeouts
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true
  },
  connectionTimeoutMillis: 5000, // 5 seconds
  idleTimeoutMillis: 120000, // 2 minutes
  max: 10, // Maximum number of clients in the pool
  retryInterval: 1000, // Retry every second
  maxRetries: 3 // Maximum number of retries
});

export const db = drizzle(pool, { schema });

// Test the connection and log the result with more detailed error information
pool.connect()
  .then(() => console.log('Successfully connected to Neon database'))
  .catch(err => {
    console.error('Failed to connect to database. Details:', {
      message: err.message,
      code: err.code,
      detail: err.detail,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER
    });
    // Don't exit the process, just log the error
    console.error('Please check your database configuration and try again');
  });