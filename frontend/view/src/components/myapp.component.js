import React, { Component } from "react";
import AuthService from "../services/auth.service";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import {Button} from 'react-bootstrap';
import * as ReactBootstrap from "react-bootstrap";
export default class MyApp extends Component {  constructor(props) {
    super(props);
    this.state = {
        data: []
    };

}


    componentDidMount() {
        //get current user ID
        const currentUserId = AuthService.getCurrentUser().id;
        const apiUrl = 'http://localhost:8080/api/getMyApp';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => this.setState({data: data}));
        var newData = this.state.data.concat([this.state.data]);
        this.setState({data: newData})

    }

    renderTeam(response, index){
        return(
            <tr key={index}>
                <td>{response.JobId}</td>
                <td>{response.JobName}</td>
                <td> <>
                    <Button href="#">Withdraw</Button>
                    {/*<Button type="submit">Dismiss</Button>{' '}*/}
                </></td>
            </tr>
        )
    }

    render(){
        console.log(this.state)
        return (
            <div className="Home" align = 'center'>

                <br/>
                <div className="midpart">
                    <h2 align="center">My Applications</h2>
                </div>
                <div className = "test">
                    <div className="formblock" align = 'center'>
                        <ReactBootstrap.Table striped bordered hover>
                            <thead className="thead-dark">
                            <tr>
                                <th>Job ID</th>
                                <th>Job Name</th>
                                <th>Operation</th>
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
