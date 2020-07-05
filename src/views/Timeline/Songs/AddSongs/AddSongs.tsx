import React, { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { Container, Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { SongInterface } from './../../../../store/songs/songs.interfaces';
import './AddSongs.scss';

type Props = {
  insertSong: (song: SongInterface) => void;
  hideAddSongsOverlay: () => void;
};

const AddSongs: React.FC<Props> = ({ insertSong, hideAddSongsOverlay }) => {
  const [spofitySearchResultList, setSpofitySearchResultList] = useState<any[]>([]);
  const [spofitySearchListSelectedIndex, setSpofitySearchListSelectedIndex] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  async function showSpotifySearchResult(spofitySearchTerm: string) {
    console.log(spofitySearchTerm);
    const response = await axios.request({
      method: 'post',
      url: 'http://localhost:4001/spotify/spotify-search',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OSwidXNlcm5hbWUiOiJndXN0YXZvIiwiaWF0IjoxNTkzODc0OTI5LCJleHAiOjE1OTM5NjEzMjl9.3BbCx4LQ0abG64y7fe1L1eym9Yj3XQbmEJCcl4EmsNE',
      },
      data: {
        queryTerm: spofitySearchTerm,
      },
    });

    const spofitySearchResultListAux = response.data.tracks.items.map((item: any, index: number) => {
      console.log(item);
      return item;
    });

    setSpofitySearchResultList(spofitySearchResultListAux);
    console.log('test');
    console.log(spofitySearchResultList);
  }

  const formatSong = (spotifySongResult: any): SongInterface => {
    const formattedArtistsArray = [];
    for (const key in spotifySongResult.artists) formattedArtistsArray.push(spotifySongResult.artists[key].name);

    let formattedImageURL = '';
    if (spotifySongResult.album.images[2].height === 64) formattedImageURL = spotifySongResult.album.images[2].url;
    else {
      formattedImageURL = 'https://i.scdn.co/image/ab67616d000048518898f3745b66a28f62f472a9';
      console.warn('Backend returned a track without a 64px sized album preview image');
    }

    const newSong: SongInterface = {
      id: -1,
      name: spotifySongResult.name,
      artists: formattedArtistsArray,
      timelineDate: new Date(spotifySongResult.album.release_date),
      previewURL: spotifySongResult.preview_url,
      imageURL: formattedImageURL,
      importance: spotifySongResult.popularity / 100,
      x: 500,
      y: 500,
    };

    // Temporary solution to not yet having the ID
    const newSongNoID: any = {
      name: spotifySongResult.name,
      artists: formattedArtistsArray,
      timelineDate: new Date(spotifySongResult.album.release_date),
      previewURL: spotifySongResult.preview_url,
      imageURL: formattedImageURL,
      importance: spotifySongResult.popularity / 100,
      x: 500,
      y: 500,
    };

    // This should be at the store level
    axios
      .post(
        'http://localhost:4001/song/insertSong',
        {
          song: JSON.stringify(newSongNoID),
        },
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OSwidXNlcm5hbWUiOiJndXN0YXZvIiwiaWF0IjoxNTkzODc0OTI5LCJleHAiOjE1OTM5NjEzMjl9.3BbCx4LQ0abG64y7fe1L1eym9Yj3XQbmEJCcl4EmsNE',
          },
        },
      )
      .then(
        (response): any => {
          console.log(response);
        },
        error => console.log(error),
      );

    return newSong;
  };

  function aud_play_pause() {
    if (audioRef.current?.paused) {
      audioRef.current.volume = 0.3;
      audioRef.current.play();
    } else {
      audioRef.current?.pause();
    }
  }

  return (
    <div
      className="input-section"
      onKeyDown={(e: React.KeyboardEvent): void => {
        if (e.keyCode === 27) hideAddSongsOverlay();
      }}
      onClick={(): void => console.log('clickou')}
    >
      <Container
        className="input-container"
        onClick={(e): void => {
          console.log('clickou container');
          e.stopPropagation();
        }}
      >
        <Row>
          <Col></Col>
          <Col sm="12" md={9}>
            <InputGroup className="song-input">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>♫</InputGroupText>
              </InputGroupAddon>
              <Input
                onChange={(event): void => {
                  showSpotifySearchResult(event.target.value);
                }}
                placeholder="Search for your hit song here..."
              />
            </InputGroup>

            {/*       <Button color="primary" onClick={(): void => aud_play_pause()}>
        playpause
      </Button> */}

            {spofitySearchResultList.map((item, i) => {
              return (
                <Row className="spotify-list-result align-items-center" key={i}>
                  <img alt={item.album.name} src={item.album.images[2].url}></img>
                  <div>
                    <li className="title">{item.name}</li>
                    <li className="artists">
                      {item.artists
                        .map((item: { name: any }) => item.name)
                        .toString()
                        .replace(/,/g, ', ')}
                    </li>
                  </div>
                  {item.preview_url ? (
                    <a
                      className="btn btn-small"
                      onClick={() => {
                        setSpofitySearchListSelectedIndex(i);
                        if (!audioRef.current?.paused && audioRef.current?.currentSrc === item.preview_url) {
                          audioRef.current?.pause();
                        } else {
                          audioRef.current?.pause();
                          audioRef.current?.load();
                          audioRef.current?.play();
                        }
                      }}
                      href="#"
                    >
                      <i className="fas fa-play fa-lg"></i>
                    </a>
                  ) : (
                    <a className="btn btn-small" style={{ color: 'transparent' }}>
                      <i className="fas fa-play fa-lg"></i>
                    </a>
                  )}
                  <a
                    className="btn btn-small"
                    onClick={() => {
                      insertSong(formatSong(item));
                    }}
                    href="#"
                  >
                    <i className="fas fa-plus fa-lg"></i>
                  </a>
                </Row>
              );
            })}

            {spofitySearchResultList[spofitySearchListSelectedIndex] && (
              <div hidden={true}>
                <span>{spofitySearchResultList[spofitySearchListSelectedIndex].name}</span>
                <audio ref={audioRef} controls>
                  <source
                    src={spofitySearchResultList[spofitySearchListSelectedIndex].preview_url}
                    type="audio/mpeg"
                  ></source>
                  Dieser HTML5 Player wird von Deinem Browser nicht unterstützt.
                </audio>
              </div>
            )}
            <div className="exit-overlay" onClick={(): void => hideAddSongsOverlay()}></div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddSongs;
