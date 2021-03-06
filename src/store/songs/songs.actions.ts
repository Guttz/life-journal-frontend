import { SongsActionsTypes } from './songs.actions.types';
import { SongInterface } from './songs.interfaces';

// Type of actions
export const ON_INSERT_SONG = 'ON_INSERT_SONG';
export const ON_UPDATE_SONG = 'ON_UPDATE_SONG';
export const ON_DELETE_SONG = 'ON_DELETE_SONG';
export const ON_SET_SONGS = 'ON_SET_SONGS';

type InsertSongType = (song: SongInterface) => SongsActionsTypes;
type DeleteSongType = (id: number) => SongsActionsTypes;

const InsertSong = (song: SongInterface): SongsActionsTypes => ({
  type: ON_INSERT_SONG,
  song: song,
});

const UpdateSong = (song: SongInterface): SongsActionsTypes => ({
  type: ON_UPDATE_SONG,
  song: song,
});

const DeleteSong = (id: number): SongsActionsTypes => ({
  type: ON_DELETE_SONG,
  id: id,
});

const SetSongs = (songs: Array<SongInterface>): SongsActionsTypes => ({
  type: ON_SET_SONGS,
  songs: songs,
});

export default {
  InsertSong,
  UpdateSong,
  DeleteSong,
  SetSongs,
};
