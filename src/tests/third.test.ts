import request from 'supertest';
import { server } from '../index';
import { v4 as uuidV4, v5 as uuidV5 } from 'uuid';

describe('third scenario', () => {
  afterAll(async () => {
    return new Promise<void>((res) => {
      server.close(() => res());
    });
  });
  it('Server should answer with status code 200', async () => {
    const res = await request(server).get('/api/users');

    expect(res.statusCode).toBe(200);
  });
  it('Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)', async () => {
    const MY_NAMESPACE = uuidV4();
    const id = uuidV5('Mike', MY_NAMESPACE);
    const res = await request(server).get(`/api/users/${id}`);

    expect(res.statusCode).toBe(400);
  });
  it('Server should answer with status code 400 and corresponding message if request body does not contain required fields', async () => {
    const res = await request(server).post(`/api/users`).send({ username: 'Mike', age: 25 });

    expect(res.statusCode).toBe(400);
  });
});
