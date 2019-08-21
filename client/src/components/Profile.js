import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { refreshAccessToken } from '../actions/auth';
import { fetchUserPlaylists } from '../actions/user';
import { API_BASE_URL, SPOTIFY_BASE_URL } from '../config';
import { setItemInLocalStorage } from '../helpers/local-storage';
class Profile extends Component {
  componentDidMount() {
    const { currentUser, dispatch } = this.props;
    const localStorageAccessToken = localStorage.getItem('accessToken');

    if (currentUser && !localStorageAccessToken) {
      setItemInLocalStorage('accessToken', currentUser.accessToken);
    }
    if (currentUser) {
      const { spotifyId } = currentUser;
      return dispatch(fetchUserPlaylists(spotifyId));
    }
  }

  render() {
    const { currentUser, playlists } = this.props;

    const playlistsToRender = playlists
      ? playlists.map(playlist => {
          const { name, images, id } = playlist;
          return (
            <li key={id}>
              <header>{name}</header>
              <section>
                <img
                  src={images[0].url}
                  alt={`Album art for ${name} playlist`}
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
