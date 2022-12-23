export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

export interface INewUser {
  username: string;
  age: number;
  hobbies: string[] | [];
}
