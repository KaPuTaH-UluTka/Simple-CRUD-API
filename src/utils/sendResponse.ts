import { ServerResponse } from 'http';

export const sendResponse = (status: number, message: unknown, res: ServerResponse) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(message));
}
