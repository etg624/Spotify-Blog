import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { refreshAccessToken } from '../actions/auth';
import { fetchUserPlaylists } from '../actions/user';
import { API_BASE_URL, SPOTIFY_BASE_URL } from '../config';

class Profile extends Component {
  componentDidMount() {
    const { currentUser } = this.props;

    if (currentUser) {
      const { dispatch } = this.props;
      const { spotifyId } = this.props.currentUser;
      dispatch(
        fetchUserPlaylists(spotifyId, localStorage.getItem('accessToken')) //prev props seems to be an updated access token
      );
    }
  }

  componentWillUpdate(prevProps) {
    const { currentUser, dispatch } = this.props;
    const { accessToken, spotifyId } = currentUser;

    if (prevProps.currentUser.accessToken !== accessToken) {
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
