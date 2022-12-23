import { ERRORS } from './constants/errors';
import { sendResponse } from './sendResponse';
import { IncomingMessage, ServerResponse } from 'http';
import { IUser } from '../types/user';

export const getPostData = async (req: IncomingMessage, res: ServerResponse): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.setEncoding('utf8');

      req
        .on('data', (chunk: { toString: () => string; }) => {
          body += chunk.toString();
        })
        .on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            if (error instanceof Error) {
              sendResponse(
                400,
                {
                  message: ERRORS.error400,
                },
                res
              );
            }
            reject(error);
          }
        });
    } catch (error) {
      sendResponse(
        500,
        {
          error: ERRORS.error500,
        },
        res
      );
      reject(error);
    }
  });
}
