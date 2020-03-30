export type SongInterface = {
  id: number;
  name: string;
  artists: Array<string>;
  previewURL: string;
  imageURL: string;
  importance: number;
  x: number;
  y: number;
};

export type SongsInterface = {
  lastIndex: number;
  songs: Array<SongInterface>;
};
