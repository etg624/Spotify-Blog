import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import Header from './components/Header';
import Landing from './components/Landing';
import Tracks from './components/Tracks';

import Profile from './components/Profile';
import { refreshAccessToken } from './actions/auth';

import './App.css';

class App extends Component {
  componentDidUpdate(prevProps) {
    const { loggedIn } = this.props;
    if (!prevProps.loggedIn && loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    const { dispatch, currentUser } = this.props;

    this.refreshInterval = setInterval(
      () => dispatch(refreshAccessToken(currentUser.spotifyId)),
      35000 // 35 seconds
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="App">
        <Header loggedIn={this.props.loggedIn} />
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/playlist/:id/tracks" component={Tracks} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.userAuthInfo !== null,
  currentUser: state.auth.userAuthInfo
});

export default connect(mapStateToProps)(App);
