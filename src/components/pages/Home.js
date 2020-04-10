import React, { Component } from 'react';
import { Switch, Router, Route, Redirect } from 'react-router-dom';

import Kahoots from '../core/games/Kahoots';
import Reports from '../core/games/Reports';

import Navbar from '../helpers/Navbar';

import history from '../../helpers/history';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Navbar type="home" />
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
      </div>
    );
  }
}

export default Home;
