import { User } from './user.interfaces';

// Type of actions
export const ON_CREATE_USER = 'ON_CREATE_USER';
export const ON_USER_CREATED = 'ON_USER_CREATED';
export const ON_CREATE_USER_ERROR = 'ON_CREATE_USER_ERROR';

const CreateUser = (user: User) => ({
  type: ON_CREATE_USER,
  user: user,
});

const UserCreated = (user: User) => ({
  type: ON_USER_CREATED,
  user: user,
});

const UserCreateError = (user: User) => ({
  type: ON_CREATE_USER_ERROR,
  user: user,
});

export type UserActions =
  | ReturnType<typeof CreateUser>
  | ReturnType<typeof UserCreated>
  | ReturnType<typeof UserCreateError>;

export { CreateUser, UserCreated, UserCreateError };
