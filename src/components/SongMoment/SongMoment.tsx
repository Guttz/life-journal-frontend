import React, { useState, useEffect } from 'react';
import { Text, Image, Ring, Circle, Line, Group } from 'react-konva';
import { SongInterface } from './../../store/songs/songs.interfaces';
import useImage from 'use-image';

type Props = {
  onDragStart(event: any): void;
  onDragMove(event: any): void;
  onDragEnd(event: any): void;
  onDblClick(event: any): void;
  createItem?(task: string): any;
};

const SongMoment: React.FC<SongInterface & Props> = ({
  name,
  artists,
  previewURL,
  imageURL,
  importance,
  x,
  y,
  onDragStart,
  onDragMove,
  onDragEnd,
  onDblClick,
}) => {
  const [image] = useImage(imageURL);
  const imgPixels = 64;
  const [groupAttrs, setGroupAttrs] = useState({ x: 0, y: 0, width: 0, height: 0 });
  let groupRef: any = React.createRef();
  debugger
  useEffect(() => {
    const groupAttrsAux: any = groupRef.getClientRect();
    if (groupAttrsAux.height !== groupAttrs.height) {
      setGroupAttrs(groupAttrsAux);
    }
  }, [groupRef, groupAttrs.height]);

  return (
    
    <Group
      x={x}
      y={y}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onDblClick={onDblClick}
      draggable
    >
      <Line points={[window.innerWidth / 2 - x, groupAttrs.height / 2, 0, groupAttrs.height / 2]} stroke="grey" />
      {/* <Rect width={groupAttrs.width} height={groupAttrs.height} fill="white"></Rect> */}
      <Group
        ref={ref => {
          groupRef = ref;
        }}
        onClick={() => {}}
        scaleX={0.5 + importance}
        scaleY={0.5 + importance}
      >
        <Image
          x={(imgPixels / 2) * (Math.sqrt(2) - 1)}
          y={(imgPixels / 2) * (Math.sqrt(2) - 1)}
          onClick={() => {}}
          width={imgPixels}
          height={imgPixels}
          image={image}
        />
        <Ring
          x={(imgPixels / 2) * Math.sqrt(2)}
          y={(imgPixels / 2) * Math.sqrt(2)}
          innerRadius={imgPixels / 2}
          outerRadius={(imgPixels / 2) * Math.sqrt(2)}
          fill="#333333"
        ></Ring>
        <Circle
          x={(imgPixels / 2) * Math.sqrt(2)}
          y={(imgPixels / 2) * Math.sqrt(2)}
          radius={imgPixels / 2}
          stroke="#26A65B"
          strokeWidth={2}
        ></Circle>
        <Text text={name} fill="white" x={imgPixels * Math.sqrt(2)} y={imgPixels / 2 - 2} />
        <Text
          text={artists.toString().replace(/,/g, ', ')}
          fill="grey"
          x={imgPixels * Math.sqrt(2)}
          y={imgPixels / 2 + 18}
        />
      </Group>
    </Group>
  );
};

export default SongMoment;
