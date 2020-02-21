import React, { useState } from 'react';
import NavigationBar from './../NavigationBar/NavigationBar';
import Memory from './../../models/MemoryModel';
import PropTypes from 'prop-types';

const Home: React.FC<{ items?: Memory[] }> = ({ items = [] }) => {
  return (
    <div>
      <NavigationBar />
      {items.map((item, i) => (
        <li key={i}> {item.id + '. ' + item.description} </li>
      ))}
    </div>
  );
};

// [Question] Prop Validation in Typescript
Home.propTypes = {
  items: PropTypes.array,
};

export default Home;
