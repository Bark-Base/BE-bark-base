/* eslint-disable no-console */
import { pool } from './lib/utils/pool';
import { setup } from './data/setup';

setup(pool)
  .catch((err:any) => console.error(err))
  .finally(() => process.exit());
