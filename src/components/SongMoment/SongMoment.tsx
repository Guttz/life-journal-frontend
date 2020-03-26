import React, { useState, useEffect } from 'react';
import { Text, Image, Ring, Circle, Line, Group } from 'react-konva';
import useImage from 'use-image';

type Props = {
  imgURL: string;
  text: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  onDragStart(event: any): void;
  onDragEnd(event: any): void;
  onDblClick(event: any): void;
  createItem?(task: string): any;
};

// eslint-disable-next-line react/prop-types
const SongMoment: React.FC<Props> = ({ imgURL, text, x, y, scaleX, scaleY, onDragStart, onDragEnd, onDblClick }) => {
  const [image] = useImage(imgURL);
  return (
    <Group
      absolutePosition={{ x: x, y: y }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDblClick={onDblClick}
      draggable
      scaleX={scaleX}
      scaleY={scaleY}>
      <Line points={[window.innerWidth / 2 - 100, y - 66, x + 80, y - 66]} stroke="grey" />
      <Image onClick={() => {}} width={66} height={66} scaleY={1} image={image} />
      <Ring x={33} y={33} innerRadius={35} outerRadius={47} fill="#333333"></Ring>
      <Circle x={33} y={33} radius={35} stroke="#26A65B" strokeWidth={2}></Circle>
      <Text
        text={text}
        fill="white"
        x={86}
        y={24}

      />
    </Group>
  );
};

export default SongMoment;
