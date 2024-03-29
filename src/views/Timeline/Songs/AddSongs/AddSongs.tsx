/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Container, Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { SongInterface } from './../../../../store/songs/songs.interfaces';
import HTTPClient from './../../../../utils/httpClient';

import './AddSongs.scss';

type Props = {
  insertSong: (song: SongInterface) => void;
  hideAddSongsOverlay: () => void;
};

const AddSongs: React.FC<Props> = ({ insertSong, hideAddSongsOverlay }) => {
  const http = new HTTPClient();
  const [spofitySearchResultList, setSpofitySearchResultList] = useState<any[]>([]);
  const [spofitySearchListSelectedIndex, setSpofitySearchListSelectedIndex] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  function showSpotifySearchResult(spofitySearchTerm: string): void {
    const request = http.post<any>('/spotify/spotify-search', { queryTerm: spofitySearchTerm });
    request.then(
      response => {
        const spofitySearchResultListAux = response.data.tracks.items.map((item: object) => {
          return item;
        });
        setSpofitySearchResultList(spofitySearchResultListAux);
      },
      error => console.log(error),
    );
  }

  // Using any due to spotify API response
  const formatSong = (spotifySongResult: any): SongInterface => {
    const formattedArtistsArray = [];
    for (const key in spotifySongResult.artists) formattedArtistsArray.push(spotifySongResult.artists[key].name);

    let formattedImageURL = '';
    if (spotifySongResult.album.images[2].height === 64) formattedImageURL = spotifySongResult.album.images[2].url;
    else {
      formattedImageURL = 'https://i.scdn.co/image/ab67616d000048518898f3745b66a28f62f472a9';
      console.warn('Backend returned a track without a 64px sized album preview image');
    }

    // Setting type any here, due to not yet having the ID from the database
    const newSongNoID: SongInterface = {
      id: spotifySongResult.id,
      name: spotifySongResult.name,
      artists: formattedArtistsArray,
      timelineDate: new Date(spotifySongResult.album.release_date),
      playing: false,
      previewURL: spotifySongResult.preview_url,
      imageURL: formattedImageURL,
      importance: spotifySongResult.popularity / 100,
      x: 500,
      y: 500,
    };

    return newSongNoID;
  };

  /*   function aud_play_pause() {
    if (audioRef.current?.paused) {
      audioRef.current.volume = 0.3;
      audioRef.current.play();
    } else {
      audioRef.current?.pause();
    }
  } */

  return (
    <div
      className="input-section"
      onKeyDown={(e: React.KeyboardEvent): void => {
        if (e.keyCode === 27) hideAddSongsOverlay();
      }}
    >
      <Container
        className="input-container"
        onClick={(e): void => {
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
                        .map((item: { name: string }) => item.name)
                        .toString()
                        .replace(/,/g, ', ')}
                    </li>
                  </div>
                  {item.preview_url ? (
                    <button
                      className="btn btn-small"
                      onClick={(): void => {
                        setSpofitySearchListSelectedIndex(i);
                        if (!audioRef.current?.paused && audioRef.current?.currentSrc === item.preview_url) {
                          audioRef.current?.pause();
                        } else {
                          audioRef.current?.pause();
                          audioRef.current?.load();
                          audioRef.current?.play();
                        }
                      }}
                    >
                      <i className="fas fa-play fa-lg"></i>
                    </button>
                  ) : (
                    <button className="btn btn-small" style={{ color: 'transparent' }}>
                      <i className="fas fa-play fa-lg"></i>
                    </button>
                  )}
                  <button
                    className="btn btn-small"
                    onClick={(): void => {
                      insertSong(formatSong(item));
                    }}
                  >
                    <i className="fas fa-plus fa-lg"></i>
                  </button>
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
