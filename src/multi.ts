import cluster, { Worker } from 'cluster';
import { cpus } from 'os';
import { createServer } from 'http';
import { createUser, deleteUser, getUser, getUsers, updateUser } from './user/userController';
import { sendResponse } from './utils/sendResponse';
import { ERRORS } from './utils/constants/errors';
import { checkUUID } from './utils/checkUUID';
import { users } from './user/userModel';
import { IUser } from './types/user';
import { PORT } from './utils/port';

const server = createServer((req, res) => {
  console.log(cluster.isPrimary);
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

const multi = async () => {
  const numOfCpus = cpus().length;

  process.on('message', (msg: any) => {
    users.length = 0;
    msg.forEach((e: IUser)=> users.push(e));
  });

  if (cluster.isPrimary) {
    const workers: Worker[] = [];

    server.listen(PORT, () => {
      console.log(`Primary pid:${process.pid}, server running on port: ${PORT}`);
    });


    console.log(`Starting ${numOfCpus} workers`);

    for (let i = 0; i < numOfCpus; i++) {
      const worker = cluster.fork();
      workers.push(worker);

      worker.on('message', ({ pid, users }) => {
        workers.forEach((el) => {
          !el.isDead() && el.process.pid !== pid && el.send(users);
        });
      });
    }

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} stopped`);
    });
  } else {
    const id = cluster.worker?.id;
    const MULTI_PORT = PORT + Number(cluster.worker?.id);

    server.listen(MULTI_PORT, () => console.log(`Server running on port ${MULTI_PORT}`));

    console.log(`Worker: ${id}, pid: ${process.pid}`);
  }
};

multi();
