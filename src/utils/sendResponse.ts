import { ServerResponse } from 'http';

export const sendResponse = async (status: number, message: unknown, res: ServerResponse) => {
  await res.writeHead(status, {
    'Content-Type': 'application/json',
    PID: process.pid,
  });
  res.end(JSON.stringify(message));
}
