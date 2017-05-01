import React from 'react';

import Rate from './Rate';

import './App.css';

const steps = [
  {value: 1, label: 'One'},
  {value: 2, label: 'Two'},
  {value: 2, label: 'Two'},
  {value: 2, label: 'Two'},
  {value: 2, label: 'Two'},
  {value: 2, label: 'Two'},
  {value: 2, label: 'Two'},
  {value: 2, label: 'Two'},
  {value: 2, label: 'Two'},
];

const App = props => (
  <div className="App">
    <Rate steps={steps} highlight={0} />
  </div>
);

export default App;
