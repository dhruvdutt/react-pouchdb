import React, { Component } from 'react';
import {db} from '../config/database';
import StudentAdd from './StudentAdd';
import './style.css';

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
    this.getData = this.getData.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {

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

  deleteStudent(student) {
    db().get(student._id).then(doc => {
      db().remove(doc).then(() => {
        this.getData();
      })
    });
  }

  toggleModalState(student) {
    this.setState({
      showModal: !this.state.showModal,
      student: student ? student : {}
    });

    this.getData();
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
      <div className="container student-list-container">

        <div className="has-text-right">
          <a className="button is-primary" onClick={this.toggleModalState}>Add</a>
        </div>
        <hr />

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
              <th>Actions</th>
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
                      <a className="button is-primary is-inverted" onClick={() => this.deleteStudent(student)}>Delete</a>
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
