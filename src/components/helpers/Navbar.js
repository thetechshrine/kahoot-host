import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Button from './Button';
import Badge from './Badge';

import history from '../../helpers/history';

const HomeNavbar = ({ onCreate }) => {
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
              <span className="material-icons">bar_chart</span>
              Reports
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="actions">
        <Button onClick={onCreate}>Create</Button>
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

const CreatorNavbar = ({ doneButtonDisabled, onDone, onExit }) => {
  return (
    <div className="navbar-home navbar-creator">
      <div className="menu">
        <h2 className="logo">Kahoot!</h2>
        <div className="edit">
          <span>Enter kahoot title...</span>
          <Badge>
            <i className="fas fa-cog"></i>
          </Badge>
        </div>
      </div>
      <div className="actions">
        <Button variant="six" className="mr-0" onClick={onExit}>
          Exit
        </Button>
        <Button variant="four" onClick={onDone} disabled={doneButtonDisabled}>
          Done
        </Button>
      </div>
    </div>
  );
};

const Navbar = ({ type, doneButtonDisabled, onCreate, onDone, onExit }) => {
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
          <HomeNavbar onCreate={onCreate} />
        </div>
      );
      break;
    case 'creator':
      navbar = (
        <div className="navbar navbar-home-container">
          <CreatorNavbar
            doneButtonDisabled={doneButtonDisabled}
            onDone={onDone}
            onExit={onExit}
          />
        </div>
      );
      break;
    default:
      navbar = <div>Navbar</div>;
  }

  return navbar;
};

Navbar.propTypes = {
  type: PropTypes.oneOf(['auth', 'home', 'creator']),
  onCreate: PropTypes.func,
  doneButtonDisabled: PropTypes.bool,
  onDone: PropTypes.func,
  onExit: PropTypes.func,
};

Navbar.defaultProps = {
  type: 'auth',
  doneButtonDisabled: false,
  onCreate: () => {},
  onDone: () => {},
  onExit: () => {},
};

export default Navbar;
