import { createServer } from 'http';
import { createUser, deleteUser, getUser, getUsers, updateUser } from './user/userController';
import { sendResponse } from './utils/sendResponse';
import { ERRORS } from './utils/constants/errors';
import { checkUUID } from './utils/checkUUID';
import { PORT } from './utils/port';

export const server = createServer((req, res) => {
  if (!req.url) return;

  if (req.url === '/api/users') {
    if (req.method === 'GET') return getUsers(req, res);

    if (req.method === 'POST') return createUser(req, res);
  }
  const id = req.url.split('/').splice(-1,1).join();

  if(id) {
    if (!checkUUID(id)) return sendResponse(400, { error: ERRORS.invalidId400 }, res);
    if (req.method === 'GET') return getUser(req, res, id);
    if (req.method === 'PUT') return updateUser(req, res, id);
    if (req.method === 'DELETE') return deleteUser(req, res, id);
  }

  sendResponse(404, { error: ERRORS.base404 }, res);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
