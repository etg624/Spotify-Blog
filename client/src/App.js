import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import Header from './components/Header';
import Landing from './components/Landing';
import Playlist from './components/Playlist';
import Player from './components/Player';
import CurrentTrackPic from './components/CurrentTrackPic';
import Profile from './components/Profile';
import { refreshAuthToken } from './actions/auth';

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
      () => dispatch(refreshAuthToken(currentUser.spotifyId)),
      1000 * 60 * 5 //5 minutes
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval);
  }

  render() {
    const { loggedIn, currentPlaylistInView, currentTrack } = this.props;
    return (
      <div className="App">
        <Header loggedIn={loggedIn} />

        {/* no exact path in order to match window.location.search */}
        <Route path="/" component={Landing} />

        <Switch>
          <Route exact path="/profile" render={() => <Profile />} />
          <Route
            exact
            path="/playlist/:id"
            render={props => <Playlist {...props} />}
          />
        </Switch>
        <footer className="player-container">
          <CurrentTrackPic
            alt={currentTrack && currentTrack.name}
            imgSrc={currentTrack && currentTrack.album.images[1].url}
          />
          <Player currentPlaylistInView={currentPlaylistInView.id} />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.userAuthInfo !== null,
  currentUser: state.auth.userAuthInfo,
  currentPlaylistInView: state.playlists.currentPlaylistInView,
  currentTrack: state.playback.currentTrack
});

export default connect(mapStateToProps)(App);
