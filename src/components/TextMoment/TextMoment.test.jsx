import React from 'react';
import ReactDOM from 'react-dom';
import TextMoment from './TextMoment';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TextMoment />, div);
  ReactDOM.unmountComponentAtNode(div);
});
