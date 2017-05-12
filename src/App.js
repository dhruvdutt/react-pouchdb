import React, { Component } from 'react';
import StudentList from './components/StudentList';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <StudentList />
      </div>
    );
  }
}

export default App;
