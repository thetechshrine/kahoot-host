import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Router,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import history from '../helpers/history';
import notificationActions from '../store/actions/notification';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Creator from './pages/Creator';
import Lobby from './pages/Lobby';
import StartGame from './pages/StartGame';
import QuestionIntro from './pages/QuestionIntro';
import QuestionBlock from './pages/QuestionBlock';
import Scoreboard from './pages/Scoreboard';
import GameOver from './pages/GameOver';
import NotFound from './pages/NotFound';

import ProtectedRoute from './helpers/ProtectedRoute';
import Notification from './helpers/Notification';

class App extends Component {
  state = {
    modalVisible: false,
  };

  componentDidMount() {}

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  render() {
    const { notification, closeNotification } = this.props;

    return (
      <BrowserRouter>
        <div className="app">
          <Notification
            type={notification.type}
            show={notification.show}
            onHide={closeNotification}
            message={notification.message}
          />
          <Router history={history}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <ProtectedRoute path="/home" component={Home} />
              <Route path="/auth" component={Auth} />
              <ProtectedRoute path="/creator" component={Creator} />
              <ProtectedRoute path="/lobby" component={Lobby} />
              <ProtectedRoute path="/game-start" component={StartGame} />
              <ProtectedRoute
                path="/question-intro"
                component={QuestionIntro}
              />
              <ProtectedRoute
                path="/question-block"
                component={QuestionBlock}
              />
              <ProtectedRoute path="/scoreboard" component={Scoreboard} />
              <ProtectedRoute path="/game-over" component={GameOver} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  notification: PropTypes.shape({
    show: PropTypes.bool,
    type: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { ui } = state;
  return { notification: ui.notification };
};

export default connect(mapStateToProps, {
  closeNotification: notificationActions.closeNotification,
})(App);
