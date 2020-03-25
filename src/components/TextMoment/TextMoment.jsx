import React from 'react';
import { Text, Line, Group } from 'react-konva';
import PropTypes from 'prop-types';
import Portal from './../utils/portal';

const TextMoment = ({
  id,
  text,
  hidden,
  x,
  y,
  onDragMove,
  onDragStart,
  onDragEnd,
  onDblClick,
  onKeyDown,
  onChange,
  scaleX,
  scaleY,
  scrollPosition,
}) => (
  <Group id={id} tagName="Group" draggable onDblClick={onDblClick} onDragMove={onDragMove}>
    <Line points={[window.innerWidth / 2, y, x, y]} stroke="grey" />
    <Text
      text={text}
      x={x}
      y={y}
      visible={!hidden}
      fill="white"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDblClick={onDblClick}
      draggable
      scaleX={scaleX}
      scaleY={scaleY}
    />
    <Portal>
      <input
        id={id}
        onKeyDown={onKeyDown}
        onChange={onChange}
        style={{
          position: 'absolute',
          display: hidden ? '' : 'none',
          top: y + scrollPosition,
          left: x,
          color: 'white',
          width: '200px',
          border: '0px',
          backgroundColor: 'transparent',
        }}
        value={text}
      />
    </Portal>
  </Group>
);

TextMoment.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onDragMove: PropTypes.func,
  onDblClick: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
};

TextMoment.defaultProps = {
  hidden: false,
  onDragMove: null,
  onDblClick: null,
  onDragStart: null,
  onDragEnd: null,
  onKeyDown: null,
  onChange: null,
  scaleX: 1,
  scaleY: 1,
  id: 0,
};

export default TextMoment;
