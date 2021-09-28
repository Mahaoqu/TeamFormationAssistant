import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "../services/auth.service";
import Login from "./login.component";
import Register from "./register.component";
import Home from "./home.component";
import Profile from "./profile.component";
import BoardUser from "./board-user.component";
import BoardManager from "./teammatch";
import BoardAdmin from "./board-admin.component";
import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';

// import AuthVerify from "./common/auth-verify";
import EventBus from "../common/EventBus";
import TeamMatch from "./teammatch";
import Projectinc from "./projectinc";
import Members from "./employee-management";
import AddMember from "./addMember";
import CandidateMatch from "./candidateMatch";
import Jobinc from "./jobinc.component";

class Header extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showManagerBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showManagerBoard: user.roles.includes("ROLE_MANAGER") || user.roles.includes("ROLE_ADMIN"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),

            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        AuthService.logout();
        this.setState({
            showManagerBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const {currentUser, showManagerBoard, showAdminBoard} = this.state;

        return (
          
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/login">Teamformation Assistant</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/home">home</Nav.Link>
                                {showManagerBoard && (
                                    <NavDropdown title="project" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="/teamMatch">team match</NavDropdown.Item>
                                        <NavDropdown.Item href="/proj_inc">project management</NavDropdown.Item>
                                    </NavDropdown>
                                )}

                                {showManagerBoard && (
                                    <NavDropdown title="recruit" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="/candidateMatch">candidate match</NavDropdown.Item>
                                        <NavDropdown.Item href="/job_inc">job management</NavDropdown.Item>
                                    </NavDropdown>
                                )}

                                {showAdminBoard && (
                                    <NavDropdown title="employee" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="/members">employee management</NavDropdown.Item>
                                    </NavDropdown>
                                )}
                                {currentUser && (<NavDropdown title="application" id="collasible-nav-dropdown">

                                    {!showManagerBoard && (
                                        <fragment>
                                            <NavDropdown.Item href="/user">project application</NavDropdown.Item>
                                            <NavDropdown.Item href="/user">job application</NavDropdown.Item>
                                            <NavDropdown.Item href="/user">my application</NavDropdown.Item>
                                        </fragment>
                                    )}
                                    {showManagerBoard && (
                                        <fragment>
                                            <NavDropdown.Item href="/man">application management</NavDropdown.Item>
                                        </fragment>
                                    )}
                                </NavDropdown>)}


                            </Nav>
                            <Nav>
                                {currentUser ? (
                                    <div className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link to={"/profile"} className="nav-link">
                                                {currentUser.username}
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/login" className="nav-link" onClick={this.logOut}>
                                                LogOut
                                            </a>
                                        </li>
                                    </div>
                                ) : (
                                    <div className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link to={"/login"} className="nav-link">
                                                Login
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link to={"/register"} className="nav-link">
                                                Sign Up
                                            </Link>
                                        </li>
                                    </div>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>


                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route path="/user" component={BoardUser}/>
                        <Route path="/teamMatch" component={TeamMatch}/>
                        <Route path="/proj_inc" component={Projectinc}/>
                        <Route path="/admin" component={BoardAdmin}/>
                        <Route path="/members" component={Members}/>
                        <Route path="/add_member" component={AddMember}/>
                        <Route path="/candidateMatch" component={CandidateMatch}/>
                        <Route path="/job_inc" component={Jobinc}/>
                    </Switch>

                </div>

                { /*<AuthVerify logOut={this.logOut}/> */}
            </div>
        );
    }
}

export default Header;