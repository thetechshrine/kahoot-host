import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import Button from './Button';

const HomeNavbar = () => {
  return (
    <div className="navbar-home">
      <div className="menu">
        <h2 className="logo">Kahoot!</h2>
        <ul>
          <li>
            <NavLink to="/home">
              <span className="material-icons">format_list_bulleted</span>
              Kahoots
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="active">
              <span class="material-icons">bar_chart</span>
              Reports
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="actions">
        <Button>Create</Button>
      </div>
    </div>
  );
};

const AuthNavBar = () => {
  return (
    <div className="navbar-auth">
      <div className="menu">
        <h2 className="logo">Kahoot!</h2>
      </div>
      <div className="actions">
        <span>Not got an account ?</span>
        <Button variant="four">Create</Button>
      </div>
    </div>
  );
};

const Navbar = (props) => {
  const { type } = props;

  return type === 'auth' ? (
    <div className="navbar-auth-container">
      <AuthNavBar />
    </div>
  ) : (
    <div className="navbar-home-container">
      <HomeNavbar />
    </div>
  );
};

Navbar.propTypes = {
  type: PropTypes.oneOf(['auth', 'home']),
};

Navbar.defaultProps = {
  type: 'auth',
};

export default Navbar;
