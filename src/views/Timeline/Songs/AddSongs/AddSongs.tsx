import React, { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import Memory from './../../../../models/MemoryModel';
import { SongInterface } from './../../../../store/songs/songs.interfaces';

type Props = {
  insertSong: (song: SongInterface) => void;
};

const AddSongs: React.FC<Props> = ({ insertSong = (): void => {}}) => {
  const [spofitySearchResultList, setSpofitySearchResultList] = useState<any[]>([]);
  const [spofitySearchListSelectedIndex, setSpofitySearchListSelectedIndex] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  async function showSpotifySearchResult(spofitySearchTerm: string) {
    console.log(spofitySearchTerm);
    const response = await axios.request({
      method: 'get',
      url: 'http://localhost:3001/spotify-search',
      params: {
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
      importance: spotifySongResult.popularity,
      x: 300,
      y: 300,
    };
    debugger;
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
    <div>
      <input
        onChange={(event): void => {
          showSpotifySearchResult(event.target.value);
        }}
      ></input>
      <Button color="primary" onClick={(): void => aud_play_pause()}>
        playpause
      </Button>

      {spofitySearchResultList[spofitySearchListSelectedIndex] && (
        <div>
          <span>{spofitySearchResultList[spofitySearchListSelectedIndex].name}</span>
          <audio ref={audioRef} controls muted>
            <source
              src={spofitySearchResultList[spofitySearchListSelectedIndex].preview_url}
              type="audio/mpeg"
            ></source>
            Dieser HTML5 Player wird von Deinem Browser nicht unterstützt.
          </audio>
        </div>
      )}

      {spofitySearchResultList.map((item, i) => (
        <div
          key={i}
          onMouseOver={() => {
            setSpofitySearchListSelectedIndex(i);
            audioRef.current?.pause();
            audioRef.current?.load();
            audioRef.current?.play();
          }}
        >
          <img alt={item.album.name} src={item.album.images[2].url}></img>
          <li style={{ display: 'inline-block' }}>{item.artists[0].name + ' - ' + item.name}</li>
          <a className="btn btn-small" onClick={() => insertSong(formatSong(item))} href="#">
            <i className="fas fa-plus fa-lg"></i>
          </a>
        </div>
      ))}
    </div>
  );
};

export default AddSongs;
