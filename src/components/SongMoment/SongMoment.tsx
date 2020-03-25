import React, { useState, useEffect } from 'react';
import { Text, Line, Group } from 'react-konva';

type Props = {
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
const SongMoment: React.FC<Props> = ({ text, x, y, scaleX, scaleY, onDragStart, onDragEnd, onDblClick }) => {
  return (
    <div>
      <Text
        text={text}
        x={x}
        y={y}
        fill="white"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDblClick={onDblClick}
        draggable
        scaleX={scaleX}
        scaleY={scaleY}
      />
    </div>
  );
};

export default SongMoment;
