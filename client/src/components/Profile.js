import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Playlist from './Playlist';
import { fetchUserPlaylists } from '../actions/playlists/fetchPlaylists';

import requiresLogin from './HOC/requiresLogin';
import '../styles/Profile.css';

class Profile extends Component {
  componentDidMount() {
    const { spotifyId, dispatch } = this.props;

    return dispatch(fetchUserPlaylists(spotifyId));
  }

  render() {
    const { playlists, loading } = this.props;
    if (loading) {
      return <div>Loading</div>;
    }
    const playlistsToRender = playlists.length ? (
      playlists.map(playlist => {
        const { name, images, id } = playlist;
        return (
          <li key={id} className="playlist-item">
            <Playlist name={name} image={images[0].url} id={id} />
          </li>
        );
      })
    ) : (
      <div>No PlayLists </div>
    );

    return (
      <main className="profile">
        <ul className="playlists">{playlistsToRender}</ul>
      </main>
    );
  }
}

const mapStateToProps = state => {
  const { playlists, loading } = state.user;

  return {
    playlists,
    loading,
    spotifyId: state.auth.userAuthInfo.spotifyId
  };
};

export default requiresLogin()(connect(mapStateToProps)(Profile));
