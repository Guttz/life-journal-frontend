import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Layer } from 'react-konva';
import SongMoment from './../../../components/SongMoment/SongMoment';
import { SongInterface } from './../../../store/songs/songs.interfaces';

type Props = {
  lastIndex: number;
  songs: Array<SongInterface>;
  insertSong: (song: SongInterface) => void;
  updateSong: (song: SongInterface) => void;
};

const SongsComponent: React.FC<Props> = ({ lastIndex, songs, insertSong, updateSong }) => {
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
    <Layer>
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
