import React, { Component } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import AddMember from './add-member.component';
import { Switch, Route, Link } from 'react-router-dom';
export default class AddMemberSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const apiUrl = 'http://localhost:8080/api/members';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
    var newData = this.state.data.concat([this.state.data]);
    this.setState({ data: newData });
  }

  renderMember(response, index) {
    return (
      <tr key={index}>
        <td>{response.id}</td>
        <td>{response.name}</td>
        <td>{response.languages}</td>
        <td>{response.hourlyRate}</td>
        <td>{response.isAssigned}</td>
        <td>{response.hourlyRate}</td>
        <td>{response.memberRole}</td>
        <td>{response.experience}</td>
        <td>{response.availableHoursPerWeek}</td>
      </tr>
    );
  }

  render() {
    console.log(this.state);
    return (
      <div className="Home" align="center">
        <br />
        <div className="midpart">
          <h1>add member successfully</h1>
          <h2 align="center">Members</h2>
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <Button href="/add_member">Add Member</Button>
          </div>
        </div>

        <div className="test">
          <div className="formblock" align="center">
            <ReactBootstrap.Table striped bordered hover>
              <thead className="thead-dark">
                <tr>
                  <th>Member ID</th>
                  <th>Member Name</th>
                  <th>Languages</th>
                  <th>HourlyRate</th>
                  <th>MemberRole</th>
                  <th>Experience</th>
                  <th>IsAssigned</th>
                  <th>SkillScore</th>
                  <th>AvailableHoursPerWeek</th>
                </tr>
              </thead>
              <tbody>{this.state.data.map(this.renderMember)}</tbody>
            </ReactBootstrap.Table>
          </div>
        </div>
        <Switch>
          <Route path="/add_member" component={AddMember} />
        </Switch>
      </div>
    );
  }
}
