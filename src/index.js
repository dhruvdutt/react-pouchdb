import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as dbConfig from './database/pouchdb';
import { indexStudents } from './database/indexes';

dbConfig.init('local', 'kittens');
// dbConfig.init('remote', 'kittens');

dbConfig.initServer('remote', 'kittens');

dbConfig.sync();

indexStudents();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
