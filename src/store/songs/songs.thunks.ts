import HTTPClient from '../../utils/httpClient';
import { SongInterface } from './songs.interfaces';
import SONG_ACTIONS from './songs.actions';

export function fetchSongsOnStart(): any {
  const http = new HTTPClient();

  // Fazer query pro db com todas as músicas
  const request = http.post<any>(process.env.BACK_HOST + '/song/fetchSongs', {});

  return (dispatch: any): void => {
    request.then(({ response }) => {
      // criar action que dá insert em várias songs, com reducer tb e chamar aq
      dispatch(SONG_ACTIONS.SetSongs(response.data));
    });
  };
}

export function InsertSong(song: SongInterface): any {
  const http = new HTTPClient();

  // Fazer query pro db com todas as músicas
  const request = http.post<any>(process.env.BACK_HOST + '/song/insertSong', song);

  return (dispatch: any): void => {
    request.then(
      response => {
        if (response.status === 200) dispatch(SONG_ACTIONS.InsertSong(song));
      },
      error => console.log(error),
    );
  };
}
