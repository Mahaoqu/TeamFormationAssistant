import React, { Component } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import AddProject from './add-project.component';
export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test:{},
      data: [],
    };
  }

  componentDidMount() {
    const apiUrl = 'http://localhost:8080/api/projects';
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => this.setState
        ({ data: data }));

    var newData = this.state.data.concat([this.state.data]);
    this.setState({ data: newData });
    
    
  }

  renderMember(response, index) {
    console.log(index);
    return (
      <tr key={index}>
        <td>{index}</td>
        <td>{response.name}</td>
        <td>{response.endDate}</td>
        <td>{response.teamSize}</td>
        <td>{response.budget}</td>
        <td>{response.isAssignmentComplete}</td>
        <td>{response.priority}</td>
        <td>{response.tools}</td>
      </tr>
    );
  }

  render() {
    console.log(this.state);
    return (
      <div className="Home" align="center">
        <br />
        <div className="midpart">
          <h2 align="center">Projects</h2>
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <Button href="/add_project">Add Porject</Button>
          </div>
        </div>

        <div className="test">
          <div className="formblock" align="center">
            <ReactBootstrap.Table striped bordered hover variant="dark">
              <thead className="thead-dark">
                <tr>
                  <th>Project Id</th>
                  <th>Project Name</th>
                  <th>ProjectEndDate</th>
                  <th>ProjectTeamSize</th>
                  <th>Budget</th>
                  <th>isAssignmentComplete</th>
                  <th>priority</th>
                  <th>Tools</th>
                </tr>
              </thead>
              <tbody>{this.state.data.map(this.renderMember)}</tbody>
            </ReactBootstrap.Table>
          </div>
        </div>
        <Switch>
          <Route path="/add_project" component={AddProject} />
        </Switch>
      </div>
    );
  }
  
 /*
  render(){
    return (
      <div>
       <ul>
          {
            this.state.data
          }
       </ul>
      </div>
    )
  }
   */
}