import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthService from '../services/auth.service';
import Login from './login.component';
import Register from './register.component';
import Home from './home.component';
import Profile from './profile.component';
import BoardUser from './board-user.component';
import BoardManager from './team-match.component';
import BoardAdmin from './board-admin.component';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';

// import AuthVerify from "./common/auth-verify";
import EventBus from '../common/EventBus';
import TeamMatch from './team-match.component';
import AddProject from './add-project.component';
import Member from './member.component';
import AddMember from './add-member.component';
import CandidateMatch from './candidate-match.component';
import AddJob from './add-job.component';
import Job from './job.component';
import Project from './project.component';
import AddJobSuccess from './add-job-success.component';
import AddMemberSuccess from './add-member-success.component';
import AddProjectSuccess from './add-project-success.component';
import CandidateMatchSuccess from './candidate-match-success.component';
import TeamMatchSuccess from './team-match-success.compont';

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
        showManagerBoard:
          user.roles.includes('ROLE_MANAGER') ||
          user.roles.includes('ROLE_ADMIN'),
        showAdminBoard: user.roles.includes('ROLE_ADMIN'),
      });
    }

    EventBus.on('logout', () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove('logout');
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
    const { currentUser, showManagerBoard, showAdminBoard } = this.state;

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/home">Teamformation Assistant</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">home</Nav.Link>
                {showManagerBoard && (
                  <NavDropdown title="project" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/team_match">
                      team match
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/projects">
                      project management
                    </NavDropdown.Item>
                  </NavDropdown>
                )}

                {showManagerBoard && (
                  <NavDropdown title="recruit" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/candidate_match">
                      candidate match
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/jobs">
                      job management
                    </NavDropdown.Item>
                  </NavDropdown>
                )}

                {showAdminBoard && (
                  <NavDropdown title="employee" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/members">
                      employee management
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                {currentUser && (
                  <NavDropdown title="application" id="collasible-nav-dropdown">
                    {!showManagerBoard && (
                      <fragment>
                        <NavDropdown.Item href="/jobs">job</NavDropdown.Item>
                        <NavDropdown.Item href="/">
                          my application
                        </NavDropdown.Item>
                      </fragment>
                    )}
                    {showManagerBoard && (
                      <fragment>
                        <NavDropdown.Item href="/man">
                          application management
                        </NavDropdown.Item>
                      </fragment>
                    )}
                  </NavDropdown>
                )}
              </Nav>
              <Nav>
                {currentUser ? (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={'/profile'} className="nav-link">
                        {currentUser.username}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/login"
                        className="nav-link"
                        onClick={this.logOut}
                      >
                        LogOut
                      </a>
                    </li>
                  </div>
                ) : (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={'/login'} className="nav-link">
                        Login
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={'/register'} className="nav-link">
                        Sign Up
                      </Link>
                    </li>
                  </div>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default Header;
