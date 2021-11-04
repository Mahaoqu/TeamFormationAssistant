/** this class, Profile
 *  is designed to render the basic information
 *  of the user
 */
import { Button } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../services/auth.service';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: '' },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: '/home' });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  render() {
    const gen_fake = () => {
      axios.post('fake/generate')
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser } = this.state;
    return (
      <div className="container">
        {this.state.userReady ? (
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>
            <p>
              <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}{' '}
              ...{' '}
              {currentUser.accessToken.substr(
                currentUser.accessToken.length - 20,
              )}
            </p>
            <p>
              <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
            </ul>

            {currentUser.roles == 'ROLE_ADMIN' && (
              <Button type="primary" onClick={gen_fake}>
                Generate Fake Data (Only for presentation)
              </Button>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
