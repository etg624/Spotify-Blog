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

  render() {
    const { currentUser, playlists } = this.props;

    const playlistsToRender = playlists
      ? playlists.map(playlist => {
          console.log(playlist);
          return (
            <li>
              <header>{playlist.name}</header>
              <section>
                <img
                  src={playlist.images[0].url}
                  alt={`Album art for ${playlist.name} playlist`}
                />
              </section>
            </li>
          );
        })
      : null;

    return !currentUser ? <Redirect to="/" /> : <div>{playlistsToRender}</div>;
  }
}

const mapStateToProps = state => {
  if (state.auth.currentUser) {
    const { currentUser } = state.auth;
    const { playlists } = state.user;
    return {
      currentUser,
      playlists
    };
  }
  return state;
};

export default connect(mapStateToProps)(Profile);
