import React, { Component } from "react";
import AuthService from "../services/auth.service"

export default class Home extends Component {

  state = {
    hour:null,
    username:'Hans'
  }

  componentDidMount() {
    this.getHour()
    this.getUser()
  }

  getHour = () => {
    const hour = this.getTimePhase()
    this.setState({hour})
  }

  getTimePhase = () => {
    const date = new Date()
    const hour = date.getHours()
    if (hour < 12){
      return "morning"
    } else if (hour < 18){
      return "afternoon"
    } else {
      return "evening"
    }
  }

  getUser = () => {
    const username = AuthService.getCurrentUser().username
    this.setState({username})
  }

  render() {
    const {hour, username} = this.state;
    return (
        <div className='App'>
          <h3>{`Good ${hour}, ${username}!`}</h3>
        </div>
    );
  }
}