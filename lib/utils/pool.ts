import { Pool } from 'pg';
const decider = process.env.DATABASE_URL ? true : false ;

export  const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
  ssl:  { rejectUnauthorized : false  }
});

// eslint-disable-next-line no-console
pool.on('connect', () => console.log('🐘 Postgres connected'));
