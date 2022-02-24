import  { pool } from '../lib/utils/pool';
import { setup } from '../data/setup';
// import request from 'supertest';
// import app from '../lib/app';

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('doest something', () => {
    expect(1).toEqual(true)
  })
});
