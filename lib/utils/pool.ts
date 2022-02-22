import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// eslint-disable-next-line no-console
pool.on('connect', () => console.log('🐘 Postgres connected'));
