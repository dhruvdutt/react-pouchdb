import React, { Component } from 'react';
import db from '../config/database';
import Student from './Student';

export default class StudentList extends Component {

  constructor() {

    super();

    this.state = {
      loading: false,
      students: []
    };
  }

  componentWillMount() {

    this.setState({
      loading: false
    });

    this.setState({
      students: [
        {
          id: '201612001',
          name: 'Dhwanil',
          contact: '8866323155',
          email: 'dhwanil@dhwanil.in'
        },
        {
          id: '201612002',
          name: 'Dhruvdutt',
          contact: '8866987456',
          email: 'dhruvdutt@dhruvdutt.in'
        }
      ]
    });
  }

  render() {

    if (this.state.loading) {
      return (
        <div className="has-text-centered">
          <h1 className="title is-1">Loading...</h1>
        </div>
      )
    }

    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.students.map(student => {
                return (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.contact}</td>
                  </tr>
                )
              })
            }
            <tr></tr>
          </tbody>
        </table>
      </div>
    );
  }

}
