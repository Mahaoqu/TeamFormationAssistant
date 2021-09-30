import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import {Button} from 'react-bootstrap';
import * as ReactBootstrap from "react-bootstrap";
export default class JobApp extends Component {  constructor(props) {
    super(props);
    this.state = {
        data: []
    };

}


    componentDidMount() {
        const apiUrl = 'http://localhost:8080/api/getJob';
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
                    <Button href="#">Apply</Button>
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
                    <h2 align="center">Available Jobs</h2>
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
