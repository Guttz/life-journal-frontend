import { ON_INSERT_SONG, ON_UPDATE_SONG, ON_DELETE_SONG, ON_SET_SONGS } from './songs.actions';
import { SongInterface, SongsInterface } from './songs.interfaces';
import { SongsActionsTypes } from './songs.actions.types';
import { UserState } from './user.interfaces';
import { ON_CREATE_USER, ON_CREATE_USER_ERROR, ON_USER_CREATED, UserActions } from './user.actions';

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
