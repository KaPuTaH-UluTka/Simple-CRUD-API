import { createServer } from 'http';
import { createUser, deleteUser, getUser, getUsers, updateUser } from './user/userController';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const server = createServer((req, res) => {
  if (!req.url) return;

  if (req.url === '/api/users') {
    if (req.method === 'GET') return getUsers(req, res);

    if (req.method === 'POST') return createUser(req, res);
  }
  const id = req.url.split('/').splice(-1,1).join();

  if(id) {
    if (req.method === 'GET') return getUser(req, res, id);
    if (req.method === 'PUT') return updateUser(req, res, id);
    if (req.method === 'DELETE') return deleteUser(req, res, id);
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
