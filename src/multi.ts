import cluster, { Worker } from 'cluster';
import { cpus } from 'os';
import dotenv from 'dotenv';
import path from 'node:path';
import { createServer } from 'http';
import { createUser, deleteUser, getUser, getUsers, updateUser } from './user/userController';
import { sendResponse } from './utils/sendResponse';
import { ERRORS } from './utils/constants/errors';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const server = createServer((req, res) => {
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

  sendResponse(404, { error: ERRORS.base404 }, res);
});

const PORT = Number(process.env.PORT || 3000);

const multi = async () => {
  const numOfCpus = cpus().length;

  if (cluster.isPrimary) {
    const workers: Worker[] = [];

    console.log(`Primary process pid: ${process.pid}`);
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
    await server.listen(PORT + Number(cluster.worker?.id), () => console.log(`Server running on port ${PORT + Number(cluster.worker?.id)}`));
    console.log(`Worker: ${id}, pid: ${process.pid}`);
  }
};

multi();
