import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import * as ReactBootstrap from "react-bootstrap";
import {Button} from 'react-bootstrap';
export default class TeamMatchSuccess extends Component {  constructor(props) {
  super(props);
  this.state = {
    data: []
  };

}


componentDidMount() {
const apiUrl = 'http://3.83.120.177:8080/api/teams';
fetch(apiUrl)
  .then(response => response.json())
  .then(data => this.setState({data: data}));
var newData = this.state.data.concat([this.state.data]);  
this.setState({data: newData})
  
}

renderTeam(response, index){
  return(
    <tr key={index}>
      <td>{response.ProjectId}</td>
      <td>{response.ProjectName}</td>
      <td>{response.MemberId}</td>
      <td>{response.MemberName}</td>
    </tr>
  )
}

render(){
  console.log(this.state)
return (
  <div className="Home" align = 'center'>

    <br/>
    <div className="midpart">
        <h1>team match successfully</h1>
        <h2 align="center">Team match</h2>
        <div  style={{display: 'flex', justifyContent: 'right'}} >
        <Button   href="http://3.83.120.177:5000/executeAlgo">Match</Button> 
        </div>
    </div>
  
    <div className = "test">
      <div className="formblock" align = 'center'>
          <ReactBootstrap.Table striped bordered hover>
            <thead className="thead-dark">
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Member ID</th>
                <th>Member Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(this.renderTeam)}
            </tbody>
          </ReactBootstrap.Table>
      </div>
    </div>
  </div>
);
}
}
