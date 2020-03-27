import { ON_INSERT_SONG, ON_DELETE_SONG } from './songs.actions';
import { SongInterface, SongsInterface } from './songs.interfaces';
import { SongsActionsTypes } from './songs.actions.types';

const defaultState: SongsInterface = {
  lastIndex: 0,
  songs: [],
};

// [Question] Defining return type of a whole reducer/state aprt
export default (state = defaultState, action: SongsActionsTypes): SongsInterface => {
  switch (action.type) {
    case ON_INSERT_SONG: {
      const newSong: SongInterface = {
        id: state.lastIndex + 1,
        ...action.song,
      };
      return { ...state, lastIndex: state.lastIndex + 1, songs: [...state.songs, newSong] };
    }

    case ON_DELETE_SONG: {
      return { ...state, songs: [...state.songs.slice(0, action.id), ...state.songs.slice(action.id + 1)] };
    }

    default:
      return state;
  }
};
