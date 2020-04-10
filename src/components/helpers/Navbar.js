import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Button from './Button';
import Badge from './Badge';

import history from '../../helpers/history';

const HomeNavbar = () => {
  return (
    <div className="navbar-home">
      <div className="menu">
        <h2 className="logo">Kahoot!</h2>
        <ul>
          <li>
            <NavLink to="/home/kahoots">
              <span className="material-icons">format_list_bulleted</span>
              Kahoots
            </NavLink>
          </li>
          <li>
            <NavLink to="/home/reports">
              <span class="material-icons">bar_chart</span>
              Reports
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="actions">
        <Button onClick={() => history.push('/creator')}>Create</Button>
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
        {history.location.pathname === '/auth/login' ? (
          <>
            <span>Not got an account ?</span>
            <Button
              variant="four"
              onClick={() => history.push('/auth/register')}
            >
              Join us now
            </Button>
          </>
        ) : (
          <>
            <span>Already have an account ?</span>
            <Button onClick={() => history.push('/auth/login')}>Back</Button>
          </>
        )}
      </div>
    </div>
  );
};

const CreatorNavbar = () => {
  return (
    <div className="navbar-home creator">
      <div className="menu">
        <h2 className="logo">Kahoot!</h2>
        <div className="edit">
          <span>Enter kahoot title...</span>
          <Badge>Edit</Badge>
        </div>
      </div>
      <div className="actions">
        <Button variant="six" className="mr-0">
          Exit
        </Button>
        <Button variant="four">Done</Button>
      </div>
    </div>
  );
};

const Navbar = (props) => {
  const { type } = props;

  let navbar;
  switch (type) {
    case 'auth':
      navbar = (
        <div className="navbar navbar-auth-container">
          <AuthNavBar />
        </div>
      );
      break;
    case 'home':
      navbar = (
        <div className="navbar navbar-home-container">
          <HomeNavbar />
        </div>
      );
      break;
    case 'creator':
      navbar = (
        <div className="navbar navbar-home-container creator">
          <CreatorNavbar />
        </div>
      );
      break;
    default:
      navbar = <div>Navbar</div>;
  }

  return navbar;
};

Navbar.propTypes = {
  type: PropTypes.oneOf(['auth', 'home']),
};

Navbar.defaultProps = {
  type: 'auth',
};

export default Navbar;
