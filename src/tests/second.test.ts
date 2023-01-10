import request from 'supertest';
import { server } from '../index';

describe('second scenario', () => {
  afterAll(async () => {
    return new Promise<void>((res) => {
      server.close(() => res());
    });
  });
  it('Requests to non-existing endpoints (e.g. some-non/existing/resource) should be handled (server should answer with status code 404 and corresponding human-friendly message)', async () => {
    const res = await request(server).get('some-non/existing/resource');

    expect(res.statusCode).toBe(404);
  });
  it('Wrong info in body(POST). Server should answer with status code 400 (server should answer with status code 400 and corresponding human-friendly message)', async () => {
    const res = await request(server).post(`/api/users`).send('wrong-info');

    expect(res.statusCode).toBe(400);
  });
});
