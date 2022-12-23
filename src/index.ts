import { createServer } from 'http';
import { createUser, getUsers } from './user/userController';

export const server = createServer((req, res) => {
  if (!req.url) return;

  if (req.url === '/api/users') {
    if (req.method === 'GET') return getUsers(req, res);

    if (req.method === 'POST') return createUser(req, res);
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
