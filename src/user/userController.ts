import { IncomingMessage, ServerResponse } from 'http';
import { createNewUser, deleteUserById, findAllUsers, findUserById, updateUserById } from './userService';
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

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
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

export const getUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const foundUser = await findUserById(id);

    if (!foundUser) return sendResponse(404, { error: ERRORS.user404 }, res);

    sendResponse(200, foundUser, res);
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

export const updateUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const foundUser = await findUserById(id);

    if (!foundUser) return sendResponse(404, { error: ERRORS.user404 }, res);

    const body = await getPostData(req, res);
    const { username, age, hobbies } = body;

    if (!username || !age || !hobbies) return sendResponse(400, { error: ERRORS.post400 }, res);

    const currentUser = {
      username: username || foundUser.username,
      age: age || foundUser.age,
      hobbies: hobbies || foundUser.hobbies,
    };

    const updatedUser = await updateUserById(id, currentUser);
    sendResponse(200, updatedUser, res);
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

export const deleteUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const foundUser = await findUserById(id);

    if (!foundUser) return sendResponse(404, { error: ERRORS.user404 }, res);

    await deleteUserById(id);

    sendResponse(204, {}, res);
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
