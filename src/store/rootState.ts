import { combineReducers } from 'redux';
import reducer from './rootReducer';
import songsReducer from './songs/songs.reducer';

export const rootReducer = combineReducers({
  items: reducer,
  songs: songsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
