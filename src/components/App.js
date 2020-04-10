import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Router,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Creator from './pages/Creator';

import history from '../helpers/history';

class App extends Component {
  state = {
    modalVisible: false,
  };

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Router history={history}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route path="/home" component={Home} />
              <Route path="/auth" component={Auth} />
              <Route path="/creator" component={Creator} />
            </Switch>
          </Router>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
