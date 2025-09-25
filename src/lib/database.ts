import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Get the database URL from environment variables
const databaseUrl = import.meta.env.VITE_DATABASE_URL;

// Create database connection lazily
let db: ReturnType<typeof drizzle> | null = null;
let sql: ReturnType<typeof neon> | null = null;

function getDatabase() {
  if (!db) {
    if (!databaseUrl) {
      console.warn('VITE_DATABASE_URL environment variable is not set. Database features will be disabled.');
      return null;
    }
    
    try {
      sql = neon(databaseUrl);
      db = drizzle(sql);
    } catch (error) {
      console.error('Failed to connect to database:', error);
      return null;
    }
  }
  
  return db;
}

function getSql() {
  if (!sql) {
    getDatabase(); // This will initialize sql as well
  }
  return sql;
}

// Export the database instance
export { getDatabase as db, getSql as sql };
