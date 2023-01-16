import { getPostData } from './getPostData';
import { IncomingMessage, ServerResponse } from 'http';
import * as http from 'http';
import { checkHost } from './checkHost';
import { PORT } from './port';
import { cpus } from 'os';

let portIncrement = 0;
export const requestSplitter = async (req: IncomingMessage, res: ServerResponse) => {
  const postData = await getPostData(req, res) || '';
  const hostname = checkHost(req.headers.host || '');
  const port = Number(PORT) + 1 + (portIncrement++ % cpus().length);

  const options = {
    hostname: hostname,
    port: port,
    path: req.url,
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
    },
  };
  let data = '';
  const request = http.request(options, (response) => {
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      data += chunk.toString();
    });
    response.on('end', () => {
      const statusCode = res.statusCode || 500;
      console.log(
        `Response from ${hostname}:${port} with ${req.method} request`
      );
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  });
  request.write(JSON.stringify(postData));
  request.end();
};
