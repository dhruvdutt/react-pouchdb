import React, { Component } from 'react';
import {db} from '../config/database';
import StudentAdd from './StudentAdd';

export default class StudentList extends Component {

  constructor() {

    super();

    this.state = {
      loading: false,
      showModal: false,
      students: [],
      student: {}
    };

    this.toggleModalState = this.toggleModalState.bind(this);
  }

  componentWillMount() {

    this.setState({
      loading: false
    });

    db().allDocs({include_docs: true}).then(response => {

      let students = [];

      response.rows.forEach(row => {
        students.push(row.doc);
      });

      this.setState({
        students:students,
        loading: false
      });
    });

  }

  toggleModalState(student) {
    this.setState({
      showModal: !this.state.showModal,
      student: student ? student : {}
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

        <a className="button is-primary is-inverted" onClick={this.toggleModalState}>Add</a>

        <StudentAdd
          showModal={this.state.showModal}
          toggleModalState={this.toggleModalState}
          student={this.state.student}
         />

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
                  <tr key={student._id}>
                    <td>{student._id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.contact}</td>
                    <td>
                      <a className="button is-primary is-inverted" onClick={() => this.toggleModalState(student)}>Edit</a>
                    </td>
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
