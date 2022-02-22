/* eslint-disable no-console */
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const app = require('./lib/app');
const pool_1 = require('./lib/utils/pool');
const API_URL = process.env.API_URL || 'http://localhost';
const PORT = process.env.PORT || 7890;
app.listen(PORT, () => {
  console.log(`🚀  Server started on ${API_URL}:${PORT}`);
});
process.on('exit', () => {
  console.log('👋  Goodbye!');
  pool_1.pool.end();
});
