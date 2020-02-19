import React, { useState } from 'react';
import NavigationBar from './../NavigationBar/NavigationBar';
import PropTypes from 'prop-types'; 

export interface Memory {
  id: number;
  description: any;
}

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

Home.propTypes = {
  items: PropTypes.array,
};

export default Home;
