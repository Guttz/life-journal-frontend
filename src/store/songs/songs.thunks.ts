import HTTPClient from '../../utils/httpClient';
import { SongInterface } from './songs.interfaces';
import SONG_ACTIONS from './songs.actions';

const fetchSongs = (): any => {
  const http = new HTTPClient();

  // Fazer query pro db com todas as músicas
  const request = http.post<any>('/song/fetchSongs', {});

  return (dispatch: any): void => {
    request.then(
      response => {
        // Criar action que dá insert em várias songs, com reducer tb e chamar aq
        dispatch(SONG_ACTIONS.SetSongs(response.data));
      },
      error => console.log(error),
    );
  };
};

const insertSong = (song: SongInterface): any => {
  const http = new HTTPClient();
  // Fazer query pro db com todas as músicas
  const request = http.post<any>('/song/insertSong', { song: JSON.stringify(song) });

  return (dispatch: any): void => {
    request.then(
      response => {
        if (response.status === 200) dispatch(SONG_ACTIONS.InsertSong(song));
      },
      error => console.log(error),
    );
  };
};

const updateSong = (song: SongInterface): any => {
  const http = new HTTPClient();
  // Fazer query pro db com todas as músicas
  const request = http.post<any>('/song/updateSong', { song: JSON.stringify(song) });
  return (dispatch: any): void => {
    request.then(
      response => {
        if (response.status === 200) dispatch(SONG_ACTIONS.UpdateSong(song));
      },
      error => console.log(error),
    );
  };
};

export default {
  fetchSongs,
  insertSong,
  updateSong
};
