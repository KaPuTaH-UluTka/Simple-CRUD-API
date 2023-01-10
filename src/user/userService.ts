import { INewUser, IUser } from '../types/user';
import { v4 as uuid } from 'uuid';
import { users } from './userModel';
import { pid } from 'process';
process.on('message', (msg: any) => {
  users.length = 0;
  msg.forEach((e: IUser)=> users.push(e));
});
export function findAllUsers(): Promise<IUser[]> {
  return new Promise((resolve) => {
    process.send?.({ users, pid });
    resolve(users);
  });
}

export function createNewUser(newUser: INewUser): Promise<IUser> {
  return new Promise((resolve) => {
    const createdNewUser: IUser = { id: uuid(), ...newUser };
    users.push(createdNewUser);
    process.send?.({ users, pid });
    resolve(createdNewUser);
  });
}

export function findUserById(id: string): Promise<IUser | undefined> {
  return new Promise((resolve) => {
    const foundUser = users.find((user) => user.id === id);
    process.send?.({ users, pid });
    resolve(foundUser);
  });
}

export function updateUserById(id: string, updatedUser: INewUser): Promise<IUser> {
  return new Promise((resolve) => {
    const index = users.findIndex((user) => user.id === id);
    users[index] = { id, ...updatedUser };
    process.send?.({ users, pid });
    resolve(users[index]);
  });
}

export function deleteUserById(id: string): Promise<true> {
  return new Promise((resolve) => {
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
    process.send?.({ users, pid });
    resolve(true);
  });
}
