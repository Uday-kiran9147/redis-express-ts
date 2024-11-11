// tests/app.test.ts

import request from 'supertest';
import app from '../src/index';
import Redis from 'ioredis';

const redis = new Redis();

afterAll(async () => {
  await redis.quit();  // Close Redis connection after tests
  
});

describe('Express App', () => {
  it('responds with "Hello World!" at the root URL', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });

  it('fetches data from GitHub and caches it', async () => {
    const username = 'octocat';

    // First request should fetch from the server and cache it
    const response1 = await request(app).get(`/repos/${username}`);
    expect(response1.status).toBe(200);
    expect(response1.body.source).toBe('server');

    // Wait briefly to allow caching
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Second request should fetch from the cache
    const response2 = await request(app).get(`/repos/${username}`);
    expect(response2.status).toBe(200);
    expect(response2.body.source).toBe('cache');
    expect(response2.body.data).toEqual(response1.body.data);
  });
});
