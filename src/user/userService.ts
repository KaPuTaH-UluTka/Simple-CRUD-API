import { INewUser, IUser } from '../types/user';
import { v4 as uuid } from 'uuid';
import { users } from './userModel';

export function findAllUsers(): Promise<IUser[]> {
  return new Promise((resolve) => {
    resolve(users);
  });
}

export function createNewUser(newUser: INewUser): Promise<IUser> {
  return new Promise((resolve) => {
    const createdNewUser: IUser = { id: uuid(), ...newUser };
    users.push(createdNewUser);
    resolve(createdNewUser);
  });
}
