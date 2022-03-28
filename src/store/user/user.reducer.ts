import { UserState } from './user.interfaces';
import { ON_CREATE_USER_ERROR, ON_USER_CREATED, UserActions } from './user.actions';

const defaultState: UserState = {
  createdUser: undefined,
  user: undefined,
};

// [Question] Defining return type of a whole reducer/state aprt
export default (state = defaultState, action: UserActions): UserState => {
  switch (action.type) {
    case ON_USER_CREATED: {
      return { ...state, createdUser: action.user };
    }
    case ON_CREATE_USER_ERROR: {
      return { ...state, createdUser: undefined };
    }
    default:
      return state;
  }
};
