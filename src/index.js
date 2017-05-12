import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as dbConfig from './database/pouchdb';

dbConfig.init('local', 'kittens');
// dbConfig.init('remote', 'kittens');

dbConfig.initServer('remote', 'kittens');

dbConfig.sync();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
