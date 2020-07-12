import { combineReducers } from 'redux';
import songsReducer from './songs/songs.reducer';

export const rootReducer = combineReducers({
  songs: songsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
