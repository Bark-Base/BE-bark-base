import { Pool } from 'pg';

export  const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
  ssl: process.env.DATABASE_URL ? true : false,
});

// eslint-disable-next-line no-console
pool.on('connect', () => console.log('🐘 Postgres connected'));
