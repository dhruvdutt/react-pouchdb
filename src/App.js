import React, { Component } from 'react';
import StudentList from './components/StudentList';
import './App.css';
import {db} from './config/database';

class App extends Component {

  componentWillMount() {
    console.log('componentWillMount', db);
  }

  render() {
    return (
      <div className="App">
        <StudentList />
      </div>
    );
  }
}

export default App;
