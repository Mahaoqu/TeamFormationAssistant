import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import { Button } from 'react-bootstrap';
import * as ReactBootstrap from 'react-bootstrap';
import AddJob from './add-job.component';
import { Switch, Route, Link } from 'react-router-dom';
export default class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showManager: false,
      showAdmin: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showManager:
          user.roles.includes('ROLE_MANAGER') ||
          user.roles.includes('ROLE_ADMIN'),
        showAdmin: user.roles.includes('ROLE_ADMIN'),
      });
    }
    const apiUrl = 'http://localhost:8080/api/jobs';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
    var newData = this.state.data.concat([this.state.data]);
    this.setState({ data: newData });
  }

  renderJobForUser(response, index) {
    return (
      <tr key={index}>
        <td>{response.JobId}</td>
        <td>{response.JobName}</td>
        <td>
          {' '}
          <>
            <Button href="#">Apply</Button>
            {/*<Button type="submit">Dismiss</Button>{' '}*/}
          </>
        </td>
      </tr>
    );
  }
  renderJobForManager(response, index) {
    return (
      <tr key={index}>
        <td>{response.JobId}</td>
        <td>{response.JobName}</td>
      </tr>
    );
  }

  render() {
    const { currentUser, showManager, showAdmin } = this.state;
    console.log(this.state);
    return (
      <div className="Home" align="center">
        <br />
        <div className="midpart">
          <h2 align="center">Jobs</h2>
          {showManager && (
            <div style={{ display: 'flex', justifyContent: 'right' }}>
              <Button href="/add_job">Add Job</Button>
            </div>
          )}
        </div>
        <div className="test">
          <div className="formblock" align="center">
            <ReactBootstrap.Table striped bordered hover>
              <thead className="thead-dark">
                <tr>
                  <th>Job ID</th>
                  <th>Job Name</th>
                  {!showManager && <th>Operation</th>}
                </tr>
              </thead>
              {!showManager && (
                <tbody>{this.state.data.map(this.renderJobForUser)}</tbody>
              )}
              {showManager && (
                <tbody>{this.state.data.map(this.renderJobForManager)}</tbody>
              )}
            </ReactBootstrap.Table>
          </div>
        </div>
        <Switch>
          <Route path="/add_job" component={AddJob} />
        </Switch>
      </div>
    );
  }
}
