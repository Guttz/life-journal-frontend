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
      updateSong(updatedSong);
    }
  };
  return (
    <Layer>
      {songs.map((song: SongInterface) => (
        <SongMoment
          key={song.id}
          imgURL={song.imageURL}
          name={song.name}
          x={song.x}
          y={song.y}
          onDragStart={() => {}}
          onDragMove={(e: Konva.KonvaEventObject<DragEvent>): void => onDragMove(e, song.id)}
          onDragEnd={() => {
            console.log('parou');
          }}
          onDblClick={() => {}}
          scaleX={1}
          scaleY={1}
        />
      ))}
    </Layer>
  );
};

export default SongsComponent;
