import React, { useState, useEffect } from 'react';
import { Text, Image, Ring, Circle, Line, Group } from 'react-konva';
import { SongInterface } from './../../store/songs/songs.interfaces';
import useImage from 'use-image';
import Konva from 'konva';
import { IRect } from 'konva/types/types';

type Props = {
  onClick(event: Konva.KonvaEventObject<MouseEvent>): void;
  onDragStart(event: Konva.KonvaEventObject<DragEvent>): void;
  onDragMove(event: Konva.KonvaEventObject<DragEvent>): void;
  onDragEnd(event: Konva.KonvaEventObject<DragEvent>): void;
  onDblClick(event: Konva.KonvaEventObject<MouseEvent>): void;
};

const SongMoment: React.FC<SongInterface & Props> = ({
  name,
  artists,
  imageURL,
  importance,
  playing,
  x,
  y,
  onClick,
  onDragStart,
  onDragMove,
  onDragEnd,
  onDblClick,
}) => {
  const [image] = useImage(imageURL);
  const imgPixels = 64;
  const [groupAttrs, setGroupAttrs] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const groupRef: React.RefObject<Konva.Group> = React.createRef();

  const [playingAnimationControlRefs, setPlayingAnimationControlRefs] = useState<any[]>([]);
  const [playingAnimationControl, setPlayingAnimationControl] = useState(2);

  useEffect(() => {
    const groupAttrsAux: IRect | undefined = groupRef.current?.getClientRect(null);
    if (groupAttrsAux !== undefined) {
      if (groupAttrsAux.height !== groupAttrs.height) {
        setGroupAttrs(groupAttrsAux);
      }
    }
  }, [groupRef, groupAttrs.height]);


  // Something here might have broken ESLint
  useEffect(() => {
    const beatAnimationCircleSize = 0.2;
    const beatAnimationTiming = 200;
    if(playing){
      const playingAnimationRef = setInterval(() => {
        setPlayingAnimationControl(playingAnimationControl - beatAnimationCircleSize);
      }, beatAnimationTiming);
      let playingAnimationRef2;
      setTimeout(() => { 
        playingAnimationRef2 = setInterval(() => {
          setPlayingAnimationControl(playingAnimationControl + beatAnimationCircleSize);
        }, beatAnimationTiming); 
        setPlayingAnimationControlRefs([playingAnimationRef, playingAnimationRef2]) 
      }, beatAnimationTiming/2);
      
    }
    else
      console.log("paused");
      console.log(playingAnimationControlRefs);
      console.log(playingAnimationControl);
      setPlayingAnimationControl(1.6);
      playingAnimationControlRefs.forEach((playingRef: any) => clearTimeout(playingRef));
  }, [playing])


  return (
    <Group
      x={x}
      y={y}
      onClick={onClick}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onDblClick={onDblClick}
      draggable
    >
      <Line points={[window.innerWidth / 2 - x, groupAttrs.height / 2, 0, groupAttrs.height / 2]} stroke="grey" />
      {/* <Rect width={groupAttrs.width} height={groupAttrs.height} fill="white"></Rect> */}
      <Group ref={groupRef} scaleX={0.5 + importance} scaleY={0.5 + importance}>
        <Image
          x={(imgPixels / 2) * (Math.sqrt(2) - 1)}
          y={(imgPixels / 2) * (Math.sqrt(2) - 1)}
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
          radius={imgPixels / playingAnimationControl}
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
