import React, { Component } from 'react';
import { db } from '../database/pouchdb';
import StudentAdd from './StudentAdd';
import './style.css';

let pageOptions = {
  include_docs: true,
  limit: 3,
  offset: 0
};

const config = {
  total_rows: 0
};

let visited = [];

export default class StudentList extends Component {

  constructor() {

    super();

    this.state = {
      loading: false,
      showModal: false,
      students: [],
      student: {},
      pages: []
    };

    this.toggleModalState = this.toggleModalState.bind(this);
    this.getData = this.getData.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.shouldNextDisable = this.shouldNextDisable.bind(this);
    this.getPages = this.getPages.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  nextPage() {
    visited.push(this.state.students[0]._id);
    pageOptions.skip = 1;
    this.getData();
    console.log('visited', visited);
  }

  previousPage() {
    pageOptions.startkey = visited.pop();
    pageOptions.skip = 0;
    this.getData();
    console.log('visited', visited);
  }

  getData(addUpdate = false) {

    if (addUpdate) {
      visited = [];
      pageOptions = {
        include_docs: true,
        limit: 3
      };
    }

    this.setState({
      loading: true
    });

    console.log('pageOptions: ', pageOptions);

    console.log('before fetch options: ', Object.assign({}, pageOptions));
    db().allDocs(
      pageOptions
    ).then(response => {

      if (response && response.rows.length > 0) {
        console.log('rows: ', response);
        config.total_rows = response.total_rows;
        pageOptions.startkey = response.rows[response.rows.length - 1].key;
        pageOptions.skip = 1;
        console.log('after fetch options: ', Object.assign({}, pageOptions));
      }

      this.setData(response.rows)

    });

  }

  changePage(pageNo) {
    console.log("Offset: " + (pageNo * pageOptions.limit));
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

    this.getPages();

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

    this.getData(true);

  }

  shouldNextDisable() {
    return ((visited.length + 1) * pageOptions.limit) >= config.total_rows;
  }

  getPages() {
    let noOfPages = Math.ceil(config.total_rows / pageOptions.limit);
    console.log('noOfPages ', noOfPages);
    let arr=[];
    for (let i=1; i<=noOfPages; i++) {
      arr.push(
        <li key={i}>
          <a className="pagination-link is-current" onClick={() => this.changePage(i)}>{i}</a>
        </li>
      );
    }
    this.setState({
      pages: arr
    });
    console.log(arr);
  }

  queryName() {
    db().query('my_index/by_name').then(function (res) {
      console.log('query result:', res);
    }).catch(function (err) {
      console.log(err);
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
      <div className="container student-list-container">

        <div className="has-text-right">
          <a className="button is-primary" onClick={this.toggleModalState}>Add</a>
          <a className="button is-info" onClick={this.queryName}>Query</a>
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
              <a className="pagination-previous" onClick={this.previousPage} title="This is the first page" disabled={!visited.length}>Previous</a>
              <a className="pagination-next" onClick={this.nextPage} disabled={this.shouldNextDisable()}>Next page</a>
              <ul className="pagination-list">
                {this.state.pages}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }

}
