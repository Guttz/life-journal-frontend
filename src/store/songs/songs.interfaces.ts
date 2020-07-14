export type SongInterface = {
  id: number;
  name: string;
  artists: Array<string>;
  timelineDate: Date;
  previewURL: string;
  playing: boolean;
  imageURL: string;
  importance: number;
  x: number;
  y: number;
};

export type SongsInterface = {
  lastIndex: number;
  songs: Array<SongInterface>;
};
