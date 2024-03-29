import request from 'supertest';
import { server } from '..';
import { IUser } from '../types/user';

describe('first scenario', () => {
  let id: string;
  let user: IUser;

  afterAll(async () => {
    return new Promise<void>((res) => {
      server.close(() => res());
    });
  });

  it('Get all records with a GET api/users request (an empty array is expected)', async () => {
    const res = await request(server).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
  it('A new object is created by a POST api/users request (a response containing newly created record is expected)', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        username: 'Mike',
        age: 25,
        hobbies: ['implement crud api', 'job search'],
      });

    id = res.body.id;
    user = res.body;

    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('Mike');
    expect(res.body.age).toBe(25);
    expect(res.body.hobbies).toEqual(['implement crud api', 'job search']);
  });
  it('With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)', async () => {
    const res = await request(server).get(`/api/users/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(user);
  });
  it('We try to update the created record with a PUT api/users/{userId} request (a response is expected containing an updated object with the same id)', async () => {
    const res = await request(server)
      .put(`/api/users/${id}`)
      .send({ username: 'Nick', age: 25, hobbies: ['implement crud api', 'job search'] });

    expect(res.statusCode).toBe(200);
    expect(res.body.username).not.toBe('Mike');
    expect(res.body.id).toBe(id);
  });
  it('With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)', async () => {
    const res = await request(server).delete(`/api/users/${id}`);

    expect(res.statusCode).toBe(204);
  });
  it('With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)', async () => {
    const res = await request(server).get(`/api/users/${id}`);

    expect(res.statusCode).toBe(404);
  });
});
