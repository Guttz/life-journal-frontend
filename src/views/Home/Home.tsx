import React, { useState } from 'react';
import NavigationBar from './../NavigationBar/NavigationBar';

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
};

export default Home;
