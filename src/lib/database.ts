import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Get the database URL from environment variables
const databaseUrl = import.meta.env.VITE_DATABASE_URL;

if (!databaseUrl) {
  throw new Error('VITE_DATABASE_URL environment variable is not set');
}

// Create the Neon client
const sql = neon(databaseUrl);

// Create the Drizzle database instance
export const db = drizzle(sql);

// Export the sql client for raw queries if needed
export { sql };
