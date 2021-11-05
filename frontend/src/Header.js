import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EventBus from './common/EventBus';
import AuthService from './services/auth.service';

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
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Container>
            <Navbar.Brand href="/home">Teamformation Assistant</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                {showManagerBoard && (
                  <NavDropdown title="Project" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/team_match">
                      Team Match
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/projects">
                      Project Management
                    </NavDropdown.Item>
                  </NavDropdown>
                )}

                {showManagerBoard && (
                  <NavDropdown title="Recruit" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/candidate_match">
                      Candidate Match
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/jobs">
                      Job Management
                    </NavDropdown.Item>
                  </NavDropdown>
                )}

                {showAdminBoard && (
                  <NavDropdown title="Employee" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/members">
                      Employee Management
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                {currentUser && (
                  <NavDropdown title="Application" id="collasible-nav-dropdown">
                    {!showManagerBoard && (
                      <fragment>
                        <NavDropdown.Item href="/jobs">Jobs</NavDropdown.Item>
                        <NavDropdown.Item href="/application">
                          My Application
                        </NavDropdown.Item>
                      </fragment>
                    )}
                    {showManagerBoard && (
                      <fragment>
                        <NavDropdown.Item href="/application_management">
                          Application Management
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
                        Logout
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
