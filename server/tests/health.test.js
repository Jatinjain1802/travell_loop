const request = require('supertest');
const app = require('../src/app');

describe('Health API', () => {
  it('returns healthy response', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Traveloop API is healthy');
  });
});
