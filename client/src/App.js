import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Landing from './components/Landing';
import Profile from './components/Profile';
import { refreshAccessToken } from './actions/auth';
import './App.css';

class App extends Component {
  componentDidUpdate(prevProps) {
    const { loggedIn } = this.props;
    if (!prevProps.loggedIn && loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    }
  }

  startPeriodicRefresh() {
    const { dispatch, currentUser } = this.props;
    this.refreshInterval = setInterval(
      () => dispatch(refreshAccessToken(currentUser.spotifyId)),
      35000 // 35 seconds
    );
  }

  render() {
    return (
      <div className="App">
        <Route path="/" component={Landing} />
        <Route path="/profile" component={Profile} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(App);
