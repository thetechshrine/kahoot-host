import React, { Component } from 'react';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import notificationActions from '../../store/actions/notification';
import authActions from '../../store/actions/auth';

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

    const { valid, ...credentials } = this.state.login;
    const { signIn } = this.props;

    signIn({ credentials });
  };

  register = (evt) => {
    evt.preventDefault();

    const { notify, signUp } = this.props;
    const { register } = this.state;

    const { password, confirmPassword } = register;
    if (password !== confirmPassword) {
      notify({
        type: 'error',
        message: 'Passwords does not match',
      });
      return;
    }

    const { lastName, firstName, username } = register;

    signUp({
      user: {
        lastName,
        firstName,
        username,
        password,
      },
    });
  };

  render() {
    const { login, register } = this.state;
    const { loading } = this.props;

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
                  loading={loading}
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
                  loading={loading}
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

Auth.propTypes = {
  loading: PropTypes.bool,
  notify: PropTypes.func.isRequired,
  closeNotification: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
};

Auth.defaultProps = {
  loading: false,
};

const mapStateToProps = (state) => {
  return {
    loading: state.core.auth.loading,
  };
};

const actions = {
  notify: notificationActions.notify,
  closeNotification: notificationActions.closeNotification,
  signUp: authActions.signUp,
  signIn: authActions.signIn,
};

export default connect(mapStateToProps, actions)(Auth);
