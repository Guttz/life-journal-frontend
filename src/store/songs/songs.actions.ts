import { SongsActionsTypes } from './songs.actions.types';
import { SongInterface } from './songs.interfaces';

// Type of actions
export const ON_INSERT_SONG = 'ON_INSERT_SONG';
export const ON_DELETE_SONG = 'ON_DELETE_SONG';

type InsertSongType = (song: SongInterface) => SongsActionsTypes;
type DeleteSongType = (id: number) => SongsActionsTypes ;

const InsertSong = (song: SongInterface): SongsActionsTypes => ({
  type: ON_INSERT_SONG,
  song: song,
});

const DeleteSong = (id: number): SongsActionsTypes => ({
  type: ON_DELETE_SONG,
  id: id,
});

interface Test {
  test(a: number): string;
}

export default {
  InsertSong,
  DeleteSong,
};
