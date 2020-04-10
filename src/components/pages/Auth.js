import React, { Component } from 'react';
import { Switch, Router, Route, Redirect } from 'react-router-dom';

import Navbar from '../helpers/Navbar';

import Login from '../core/auth/Login';
import Register from '../core/auth/Register';

import history from '../../helpers/history';

class Auth extends Component {
  state = {
    login: {
      username: '',
      password: '',
      valid: false,
    },
    register: {
      lastName: '',
      firstName: '',
      username: '',
      password: '',
      confirmPassword: '',
      valid: false,
    },
  };

  checkFormValid = (name, dataGroup) => {
    let valid = true;
    Object.keys(dataGroup).forEach((key) => {
      if (key !== 'valid' && !dataGroup[key]) valid = false;
    });
    Object.assign(dataGroup, { valid });

    this.setState({
      [name]: dataGroup,
    });
  };

  onChange = ({ name, value }) => {
    const nameParts = name.split('.');
    const dataGroup = { ...this.state }[nameParts[0]];
    dataGroup[nameParts[1]] = value;
    this.setState({
      [nameParts[0]]: dataGroup,
    });

    this.checkFormValid([nameParts[0]], dataGroup);
  };

  login = (evt) => {
    evt.preventDefault();
  };

  register = (evt) => {
    evt.preventDefault();
  };

  render() {
    const { login, register } = this.state;

    return (
      <div className="auth">
        <Navbar type="auth" />
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/auth"
              render={() => <Redirect to="/auth/login" />}
            />
            <Route
              path="/auth/login"
              render={() => (
                <Login
                  valid={login.valid}
                  onChange={this.onChange}
                  onSubmit={this.login}
                />
              )}
            />
            <Route
              path="/auth/register"
              render={() => (
                <Register
                  valid={register.valid}
                  onChange={this.onChange}
                  onSubmit={this.register}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Auth;
