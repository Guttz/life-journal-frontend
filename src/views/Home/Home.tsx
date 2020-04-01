import React, { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import NavigationBar from './../NavigationBar/NavigationBar';
import Memory from './../../models/MemoryModel';
import PropTypes from 'prop-types';
import './Home.css';

type Props = {
  items?: Memory[];
  createItem?(task: string): any;
  deleteItem?(id: number): any;
};

const Home: React.FC<Props> = ({ items = [], createItem = (): void => {}, deleteItem = (): void => {} }) => {
  const [inputDescription, setInputDescription] = useState('');
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
      <NavigationBar />
      {items.map((item, i) => (
        <li key={i}>
          {item.id + '. ' + item.description}
          <span
            className="delete-item-span"
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={(): void => deleteItem(i)}
          >
            {' '}
            x{' '}
          </span>
        </li>
      ))}
      <input onChange={(event): void => setInputDescription(event.target.value)}></input>

      <Button color="primary" onClick={(): void => createItem(inputDescription)}>
        Create Note
      </Button>

      <Button color="primary" onClick={(): void => aud_play_pause()}>
        playpause
      </Button>

      <input
        onChange={(event): void => {
          showSpotifySearchResult(event.target.value);
        }}
      ></input>
      {spofitySearchResultList[spofitySearchListSelectedIndex] && (
        <div>
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
        </div>
      ))}
    </div>
  );
};

// [Question] Prop Validation in Typescript
Home.propTypes = {
  items: PropTypes.array,
  createItem: PropTypes.func,
  deleteItem: PropTypes.func,
};

export default Home;
