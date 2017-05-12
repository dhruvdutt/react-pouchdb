import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as dbConfig from './config/database';

dbConfig.init('local', 'kittens');
// dbConfig.init('remote', 'kittens');

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
