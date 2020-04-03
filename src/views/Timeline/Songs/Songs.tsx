import React, { useState } from 'react';
import Konva from 'konva';
import { Layer } from 'react-konva';
import SongMoment from './../../../components/SongMoment/SongMoment';
import AddSongs from './AddSongs/AddSongs';
import { SongInterface } from './../../../store/songs/songs.interfaces';
import Portal from './../../../components/utils/portal';
import './Songs.scss';

type Props = {
  lastIndex: number;
  layerY: number;
  songs: Array<SongInterface>;
  insertSong: (song: SongInterface) => void;
  updateSong: (song: SongInterface) => void;
};

const SongsComponent: React.FC<Props> = ({ lastIndex, songs, insertSong, updateSong, layerY }) => {
  const [hideAddSongs, setHideAddSongs] = useState(false);

  const onDragMove = (e: Konva.KonvaEventObject<DragEvent>, songID: number): void => {
    const updatedSong = songs.find(auxSong => auxSong.id === songID);
    //setGroupX(e.currentTarget.attrs.x);
    if (updatedSong) {
      updatedSong.x = e.currentTarget.attrs.x;
      updatedSong.y = e.currentTarget.attrs.y;
      updatedSong.importance = (2 * Math.abs(updatedSong.x - window.innerWidth / 2)) / window.innerWidth;
      updateSong(updatedSong);
    }
  };
  return (
    <Layer y={layerY}>
      <Portal>
        <button
          onClick={() => setHideAddSongs(!hideAddSongs)}
          onKeyDown={(e: React.KeyboardEvent): void => {
            if (e.keyCode === 27) setHideAddSongs(true);
          }}
        >
          AAAAAAAAAAAAAAAAAAAAAAAA
        </button>
        <div
          className="App"
          id="add-songs-overlay"
          hidden={hideAddSongs}
          onKeyDown={(e: React.KeyboardEvent): void => {
            if (e.keyCode === 27) setHideAddSongs(true);
          }}
          /* onClick={(): void => setHideAddSongs(true)} */
        >
          <AddSongs insertSong={insertSong} hideAddSongsOverlay={(): void => setHideAddSongs(true)}></AddSongs>
        </div>
      </Portal>
      {songs.map((song: SongInterface) => (
        <SongMoment
          key={song.id}
          {...song}
          onDragStart={() => {}}
          onDragMove={(e: Konva.KonvaEventObject<DragEvent>): void => onDragMove(e, song.id)}
          onDragEnd={() => {
            console.log('parou');
          }}
          onDblClick={() => {}}
        />
      ))}
    </Layer>
  );
};

export default SongsComponent;
