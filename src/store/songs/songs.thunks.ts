import HTTPClient from '../../utils/httpClient';

function fetchSongsOnStart() {
  const http = new HTTPClient();

  const request = http.post<any>(process.env.BACK_HOST + '/spotify/spotify-search?queryTerm=amado', {
    queryTerm: 'amado',
  });

  return (dispatch: any) => {
    request.then(({ data }) => {
      // criar action que dá insert em várias songs, com reducer tb e chamar aq
      dispatch(data);
    });
  };
}
