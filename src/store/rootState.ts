import { SongsInterface } from './songs/songs.interfaces';

export interface RootState {
  moments: {
    lastIndex: number;
    songs: SongsInterface;
  };
}
