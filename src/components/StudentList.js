import React, { Component } from 'react';
import { db } from '../database/pouchdb';
import StudentAdd from './StudentAdd';
import './style.css';

let pageOptions = {
  include_docs: true,
  limit: 5
};

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

  getData(prev = false) {

    this.setState({
      loading: false
    });

    console.log('pageOptions: ', pageOptions);

    if (prev === true && pageOptions.prevStartKey) {
      pageOptions.startkey = pageOptions.prevStartKey;
      pageOptions.descending = true;
      pageOptions.skip = 0;
    }

    console.log('before fetch options: ', Object.assign({}, pageOptions));
    db().allDocs(
      pageOptions
    ).then(response => {

      if (response && response.rows.length > 0) {
        console.log('rows: ', response.rows);
        if (prev === true) {
          pageOptions.startkey = pageOptions.prevStartKey;
          pageOptions.prevStartKey = response.rows[response.rows.length - 1].key;
        } else {
          pageOptions.prevStartKey = pageOptions.startkey ? pageOptions.startkey : null;
          pageOptions.startkey = response.rows[response.rows.length - 1].key;
        }
        pageOptions.skip = 1;
        console.log('after fetch options: ', Object.assign({}, pageOptions));
      }

      if (prev === true) {
        this.setData(response.rows.reverse())
      } else {
        this.setData(response.rows)
      }

    });

  }

  setData(rows) {
    let students = [];

    rows.forEach(row => {
      students.push(row.doc);
    });

    this.setState({
      students:students,
      loading: false
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
      student: student && student._id ? student : {}
    });

    if (!student) {
      this.getData();
    }

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
          studentID={this.state.student._id}
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
                      <a className="button is-primary is-inverted" onClick={() => this.toggleModalState(student)}>Edit</a>
                      <a className="button is-primary is-inverted" onClick={() => this.deleteStudent(student)}>Delete</a>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className="columns">
          <div className="column">
            <nav className="pagination">
              <a className="pagination-previous" onClick={() => this.getData(true)} title="This is the first page">Previous</a>
              <a className="pagination-next" onClick={this.getData}>Next page</a>
              <ul className="pagination-list">
                <li>
                  <a className="pagination-link is-current">1</a>
                </li>
                <li>
                  <a className="pagination-link">2</a>
                </li>
                <li>
                  <a className="pagination-link">3</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }

}
