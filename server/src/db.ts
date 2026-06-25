import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in your .env file.');
  console.error('   Copy server/.env.example to server/.env and fill in your PostgreSQL credentials.');
  process.exit(1);
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Optional pool sizing for local dev
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Test connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Failed to connect to PostgreSQL:', err.message);
    console.error('   Check that PostgreSQL is running and DATABASE_URL is correct.');
    process.exit(1);
  }
  release();
  console.log('✅ Connected to PostgreSQL successfully.');
});
