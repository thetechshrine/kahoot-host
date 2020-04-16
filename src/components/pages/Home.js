import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import authActions from '../../store/actions/auth';
import gameActions from '../../store/actions/game';

import { Switch, Router, Route, Redirect } from 'react-router-dom';

import Kahoots from '../core/games/Kahoots';
import Reports from '../core/games/Reports';
import GameModal from '../core/games/GameModal';

import Navbar from '../helpers/Navbar';

import history from '../../helpers/history';
import ImageButton from '../helpers/ImageButton';

class Home extends Component {
  state = {
    createGameModalVisible: false,
    game: {
      title: '',
      description: '',
      file: {},
    },
  };

  componentDidMount() {
    const { profile } = this.props;
    profile();
  }

  toggleCreateGameModal = () => {
    this.setState({
      createGameModalVisible: !this.state.createGameModalVisible,
    });
  };

  extractInitials = (user) =>
    String(
      `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    ).toUpperCase();

  onChange = ({ name, value }) => {
    const { game } = { ...this.state };
    game[name] = value;
    this.setState({ game });
  };

  onFileChange = ({ file, deleted }) => {
    if (deleted) {
      this.setState({
        game: { ...this.state.game, file: {} },
      });
    } else if (file) {
      this.setState({
        game: { ...this.state.game, file },
      });
    }
  };

  createGame = () => {
    const { title, description, file } = this.state.game;
    if (!title) return;

    const formData = new FormData();
    formData.append('title', title);
    if (description) formData.append('description', description);
    if (file) {
      formData.append('image', file);
      formData.append('folder', 'games');
    }

    this.props.createGame({ formData });
    this.toggleCreateGameModal();
  };

  render() {
    const { createGameModalVisible } = this.state;
    const { user } = this.props;

    return (
      <div className="home">
        <Navbar type="home" onCreate={this.toggleCreateGameModal} />
        <div className="inner-container">
          <header className="sidebar">
            <div className="user">
              {user.uuid && (
                <>
                  <span className="initials">{this.extractInitials(user)}</span>
                  <div className="info">
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                    <span>@{user.username}</span>
                  </div>
                </>
              )}
            </div>
            <div className="actions">
              <ImageButton type="one">
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </ImageButton>
            </div>
          </header>

          <main className="main">
            <Router history={history}>
              <Switch>
                <Route
                  exact
                  path="/home"
                  render={() => <Redirect to="/home/kahoots" />}
                />
                <Route path="/home/kahoots" component={Kahoots} />
                } />
                <Route path="/home/reports" component={Reports} />} />
              </Switch>
            </Router>
          </main>
        </div>

        <GameModal
          show={createGameModalVisible}
          onHide={this.toggleCreateGameModal}
          onDone={this.createGame}
          onChange={this.onChange}
          onFileChange={this.onFileChange}
        />
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string,
    lastName: PropTypes.string,
    firstName: PropTypes.string,
    username: PropTypes.string,
  }),
  profile: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired,
};

Home.defaultProps = {
  user: {},
};

const mapStateToProps = (state) => {
  return {
    user: state.core.auth.user,
  };
};

const actions = {
  profile: authActions.profile,
  createGame: gameActions.createGame,
};

export default connect(mapStateToProps, actions)(Home);
