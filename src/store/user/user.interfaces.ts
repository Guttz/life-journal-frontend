export interface User {
  id?: string;
  username: string;
  password: string;
  name: string;
  createdAt?: string;
  updateAt?: string;
}

export interface UserState {
  user?: User;
  createdUser?: User;
}
