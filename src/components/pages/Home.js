import React, { Component } from 'react';
import { Switch, Router, Route, Redirect } from 'react-router-dom';

import Kahoots from '../core/games/Kahoots';
import Reports from '../core/games/Reports';
import GameModal from '../core/games/GameModal';

import Navbar from '../helpers/Navbar';

import history from '../../helpers/history';

class Home extends Component {
  state = {
    createGameModalVisible: false,
  };

  toggleCreateGameModal = () => {
    this.setState({
      createGameModalVisible: !this.state.createGameModalVisible,
    });
  };

  render() {
    const { createGameModalVisible } = this.state;

    return (
      <div className="home">
        <Navbar type="home" onCreate={this.toggleCreateGameModal} />
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/home"
              render={() => <Redirect to="/home/kahoots" />}
            />
            <Route path="/home/kahoots" component={Kahoots} />} />
            <Route path="/home/reports" component={Reports} />} />
          </Switch>
        </Router>

        <GameModal
          show={createGameModalVisible}
          onHide={this.toggleCreateGameModal}
          onDone={() => {}}
        />
      </div>
    );
  }
}

export default Home;
