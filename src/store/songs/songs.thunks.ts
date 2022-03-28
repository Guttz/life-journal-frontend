import HTTPClient from '../../utils/httpClient';
import { SongInterface } from './songs.interfaces';
import SONG_ACTIONS from './songs.actions';
import { Dispatch, AnyAction } from 'redux';
import { AxiosResponse } from 'axios';
import { DispatchFunction } from '../../utils/SharedTypes';

const fetchSongs = (): DispatchFunction => {
  const http = new HTTPClient();
  // Fazer query pro db com todas as músicas
  const request = http.post<AxiosResponse<SongInterface[]>>('/song/fetchSongs', {});

  return (dispatch: Dispatch) => {
    request.then(
      response => {
        dispatch(SONG_ACTIONS.SetSongs(response.data));
      },
      error => console.log(error),
    );
  };
};

const insertSong = (song: SongInterface): ((d: Dispatch) => void) => {
  const http = new HTTPClient();
  // Fazer query pro db com todas as músicas
  const request = http.post<AxiosResponse<string>>('/song/insertSong', { song: JSON.stringify(song) });

  return (dispatch: Dispatch): void => {
    request.then(
      response => {
        if (response.status === 200) dispatch(SONG_ACTIONS.InsertSong(song));
      },
      error => console.log(error),
    );
  };
};

const updateSong = (song: SongInterface): DispatchFunction => {
  const http = new HTTPClient();
  // Fazer query pro db com todas as músicas
  const request = http.post<AxiosResponse<SongInterface>>('/song/updateSong', { song: JSON.stringify(song) });
  return (dispatch: Dispatch<AnyAction>): void => {
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
  updateSong,
};
