import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Layer } from 'react-konva';
import SongMoment from './../../../components/SongMoment/SongMoment';
import AddSongs from './AddSongs/AddSongs';
import AddMoment from '../../../components/AddMoment/AddMoment';
import { SongInterface } from './../../../store/songs/songs.interfaces';
import Portal from './../../../components/utils/portal';
import './Songs.scss';

export type StateProps = {
  lastIndex: number;
  layerY: number;
  songs: Array<SongInterface>;
};

export type DispatchProps = {
  fetchSongs: () => void;
  insertSong: (song: SongInterface) => void;
  updateSong: (song: SongInterface) => void;
  updateSongLocal: (song: SongInterface) => void;
};

const SongsComponent: React.FC<StateProps & DispatchProps> = ({
  songs,
  fetchSongs,
  insertSong,
  updateSong,
  updateSongLocal,
  layerY,
}) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [hideAddSongs, setHideAddSongs] = useState(true);
  const [selectedSong, setSelectedSong] = useState<SongInterface | null>(null);

  useEffect(fetchSongs, []);

  const onDragMove = (e: Konva.KonvaEventObject<DragEvent>, songID: number): void => {
    const updatedSong = songs.find(auxSong => auxSong.id === songID);
    //setGroupX(e.currentTarget.attrs.x);
    if (updatedSong) {
      updatedSong.x = e.currentTarget.attrs.x;
      updatedSong.y = e.currentTarget.attrs.y;
      updatedSong.importance = (2 * Math.abs(updatedSong.x - window.innerWidth / 2)) / window.innerWidth;
      updateSongLocal(updatedSong);
    }
  };

  const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>, songID: number): void => {
    const updatedSong = songs.find(auxSong => auxSong.id === songID);
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
        <audio ref={audioRef}>
          <source src={selectedSong?.previewURL} type="audio/mpeg"></source>
          Dieser HTML5 Player wird von Deinem Browser nicht unterstützt.
        </audio>
        <button
          onClick={() => setHideAddSongs(!hideAddSongs)}
          onKeyDown={(e: React.KeyboardEvent): void => {
            if (e.keyCode === 27) setHideAddSongs(true);
          }}
        >
          Add Song
        </button>
        <div
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
          onClick={(): void => {
            setSelectedSong(song);
            if (!audioRef.current?.paused && audioRef.current?.currentSrc === song.previewURL) {
              audioRef.current?.pause();
            } else {
              audioRef.current?.pause();
              audioRef.current?.load();
              audioRef.current?.play();
            }
          }}
          onDragStart={() => {}}
          onDragMove={(e: Konva.KonvaEventObject<DragEvent>): void => onDragMove(e, song.id)}
          onDragEnd={(e: Konva.KonvaEventObject<DragEvent>): void => onDragEnd(e, song.id)}
          onDblClick={() => {}}
        />
      ))}
      <AddMoment onClick={() => setHideAddSongs(!hideAddSongs)} />
    </Layer>
  );
};

export default SongsComponent;
