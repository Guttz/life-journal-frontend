import { SongInterface } from './songs.interfaces';

export type InsertSongType = {
  type: 'ON_INSERT_SONG';
  song: SongInterface;
}

export type UpdateSongType = {
  type: 'ON_UPDATE_SONG';
  song: SongInterface;
}

export type DeleteSongType = {
  type: 'ON_DELETE_SONG';
  id: number;
}

export type SongsActionsTypes = InsertSongType | UpdateSongType | DeleteSongType;
