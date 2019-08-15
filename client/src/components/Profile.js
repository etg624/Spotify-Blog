import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { refreshAccessToken } from '../actions/auth';
import { API_BASE_URL, SPOTIFY_BASE_URL } from '../config';

class Profile extends Component {
  componentDidMount() {
    const { currentUser } = this.props;

    if (currentUser) {
      const { dispatch } = this.props;
      const { spotifyId } = this.props.currentUser;
      return dispatch(refreshAccessToken(spotifyId));
    }
  }

  componentWillUpdate(prevProps) {
    const { currentUser } = this.props;
    const { accessToken, spotifyId } = currentUser;

    if (prevProps.currentUser.accessToken !== accessToken) {
      return fetch(`${SPOTIFY_BASE_URL}/users/${spotifyId}/playlists`, {
        headers: {
          Authorization: `Bearer ${prevProps.currentUser.accessToken}`
        }
      })
        .then(res => res.json())
        .then(playlists => console.log(playlists));
    }
  }

  render() {
    const { currentUser } = this.props;
    return !currentUser ? (
      <Redirect to="/" />
    ) : (
      <div>{currentUser.displayName}</div>
    );
  }
}

const mapStateToProps = state => {
  if (state.auth.currentUser) {
    const { currentUser } = state.auth;

    return {
      currentUser
    };
  }
  return state;
};

export default connect(mapStateToProps)(Profile);
