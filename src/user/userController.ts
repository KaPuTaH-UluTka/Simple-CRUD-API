import { IncomingMessage, ServerResponse } from 'http';
import { createNewUser, findAllUsers } from './userService';
import { sendResponse } from '../utils/sendResponse';
import { ERRORS } from '../utils/constants/errors';
import { getPostData } from '../utils/getPostData';

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const foundUsers = await findAllUsers();
    sendResponse(200, foundUsers, res);
  } catch (error) {
    sendResponse(
      500,
      {
        error: ERRORS.error500,
      },
      res
    );
  }
}

export async function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getPostData(req, res);
    const { username, age, hobbies } = body;

    if (!username || !age || !hobbies) return sendResponse(400, { error: ERRORS.post400 }, res);

    const newUser = {
      username,
      age,
      hobbies,
    };

    const createdNewUser = await createNewUser(newUser);
    sendResponse(201, createdNewUser, res);
  } catch (error) {
    sendResponse(
      500,
      {
        error: ERRORS.error500,
      },
      res
    );
  }
}
