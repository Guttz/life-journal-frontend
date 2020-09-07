import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-konva';
import useImage from 'use-image';

const AddMoment = ({ onClick, scaleY }) => {
  const [image] = useImage('https://image.flaticon.com/icons/svg/148/148764.svg');
  return (
    <Image
      onClick={onClick}
      absolutePosition={{
        x: window.innerWidth - 80,
        y: window.innerHeight - 80,
      }}
      width={66}
      height={66}
      scaleY={scaleY}
      image={image}
    />
  );
};

AddMoment.propTypes = {
  onClick: PropTypes.func,
  scaleY: PropTypes.number,
};

AddMoment.defaultProps = {
  onClick: null,
  scaleY: 1,
};

export default AddMoment;
