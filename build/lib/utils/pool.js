'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.pool = void 0;
const pg_1 = require('pg');
exports.pool = new pg_1.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
// eslint-disable-next-line no-console
exports.pool.on('connect', () => console.log('🐘 Postgres connected'));
