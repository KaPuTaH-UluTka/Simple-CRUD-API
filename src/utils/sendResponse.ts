import { ServerResponse } from 'http';

export const sendResponse = (status: number, message: unknown, res: ServerResponse) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    PID: process.pid,
  });
  res.end(JSON.stringify(message));
}
