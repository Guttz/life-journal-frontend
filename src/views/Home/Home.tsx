import React, { useState } from 'react';
import { Button } from 'reactstrap';
import NavigationBar from './../NavigationBar/NavigationBar';
import Memory from './../../models/MemoryModel';
import PropTypes from 'prop-types';

type Props = {
  items?: Memory[];
  createItem(task: string): any;
};

const Home: React.FC<Props> = ({ items = [], createItem }) => {
  const [inputDescription, setInputDescription] = useState('');
  return (
    <div>
      <NavigationBar />
      {items.map((item, i) => (
        <li key={i}> {item.id + '. ' + item.description} </li>
      ))}
      <input onChange={(event): void => setInputDescription(event.target.value)}></input>
      <Button color="primary" onClick={(): void => createItem(inputDescription)}>
        Create Note
      </Button>
    </div>
  );
};

// [Question] Prop Validation in Typescript
Home.propTypes = {
  items: PropTypes.array,
};

export default Home;
