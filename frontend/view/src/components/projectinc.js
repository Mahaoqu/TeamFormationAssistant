import React, { Component } from "react";

import * as ReactBootstrap from "react-bootstrap";
export default class Projectinc extends Component {  constructor(props) {
  super(props);
  this.state = {
    data: []
  };

}


componentDidMount() {
const apiUrl = 'http://localhost:8080/api/test/teams';
fetch(apiUrl)
  .then(response => response.json())
  .then(data => this.setState({data: data}));
var newData = this.state.data.concat([this.state.data]);
this.setState({data: newData})

}


render(){
  console.log(this.state)
return (

    <h3>Project initiate page</h3>

);
}
}
