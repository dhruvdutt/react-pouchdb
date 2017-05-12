import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as db from './config/database';

db.init('local', 'kittens', false);
// database.init('remote', 'kittens', true);

let doc = {
  "name": "Mittens",
  "occupation": "kitten",
  "age": 3,
  "hobbies": [
    "playing with balls of yarn",
    "chasing laser pointers",
    "lookin' hella cute"
  ]
};

db.post(doc)
  .then(function (done) {
    console.log(done);
  })
  .catch(function (err) {
    console.log(err);
  });

db.get('mittens').then(function (doc) {
  console.log('Fetched: ', doc);
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
