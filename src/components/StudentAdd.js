import React, { Component } from 'react';
import {db} from '../config/database';

export default class StudentAdd extends Component {

  constructor(props) {
    super(props);

    this.state = {
      student: {}
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addUpdateStudent = this.addUpdateStudent.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.studentID) {
      db().get(nextProps.studentID).then(response => {
        this.setState({
          student: response
        });
      })
    }
  }

  handleInputChange(event) {
    let field = event.target.name;
    let student = Object.assign({}, this.state.student);
    student[field] = event.target.value;

    this.setState({
      student
    });
  }

  addUpdateStudent() {
    db().put(this.state.student);
    this.setState({
      student: {}
    });
    this.props.toggleModalState();
  }

  closeModal() {
    this.setState({
      student: {}
    });

    this.props.toggleModalState();
  }

  render() {

    return(
      <div className={"modal " + (this.props.showModal ? "is-active" : "")}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="card">
            <div className="card-content">
              <div className="field">
                <label className="label">ID</label>
                <p className="control">
                  <input className="input" type="text" placeholder="123456" name="_id" onChange={this.handleInputChange} value={this.state.student._id || ''} />
                </p>
              </div>
              <div className="field">
                <label className="label">Name</label>
                <p className="control">
                  <input className="input" type="text" placeholder="Test" name="name" onChange={this.handleInputChange} value={this.state.student.name || ''} />
                </p>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <p className="control">
                  <input className="input" type="email" placeholder="d@d.in" name="email" onChange={this.handleInputChange} value={this.state.student.email || ''} />
                </p>
              </div>
              <div className="field">
                <label className="label">Contact</label>
                <p className="control">
                  <input className="input" type="text" placeholder="8866323155" name="contact" onChange={this.handleInputChange} value={this.state.student.contact || ''} />
                </p>
              </div>
              <div className="field">
                <a className="button is-primary is-inverted" onClick={this.addUpdateStudent}>Add</a>
              </div>
            </div>
          </div>
        </div>
        <button className="modal-close" onClick={this.closeModal}></button>
      </div>
    )
  }
}
