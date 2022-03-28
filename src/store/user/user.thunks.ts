import { AxiosResponse } from 'axios';
import { AnyAction, Dispatch } from 'redux';
import HTTPClient from '../../utils/httpClient';
import { DispatchFunction } from '../../utils/SharedTypes';
import { UserCreated, UserCreateError } from './user.actions';
import { User } from './user.interfaces';

const createUser = (user: User): DispatchFunction => {
  const http = new HTTPClient();
  // Fazer query pro db com todas as músicas
  const request = http.post<AxiosResponse<User>>('/user/createUser', user);

  return (dispatch: Dispatch) => {
    request
      .then(() => {
        dispatch(UserCreated(user));
      })
      .catch(() => dispatch(UserCreateError(user)));
  };
};
