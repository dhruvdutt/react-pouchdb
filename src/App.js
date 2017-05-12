import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {db} from './config/database';

class App extends Component {

  componentWillMount() {
    console.log('componentWillMount', db);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
