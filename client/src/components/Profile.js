import React, { Component } from 'react';

import Player from './Player';
import { connect } from 'react-redux';
import PlaylistLink from './PlaylistLink';
import { fetchUserPlaylists } from '../actions/playlists/fetchPlaylists';

import requiresLogin from './HOC/requiresLogin';
import '../styles/Profile.css';

class Profile extends Component {
  componentDidMount() {
    const { spotifyId, dispatch } = this.props;

    return dispatch(fetchUserPlaylists(spotifyId));
  }

  render() {
    const { playlists, loading, currentPlaylist } = this.props;
    if (loading) {
      return <div>Loading</div>;
    }
    const playlistsToRender = playlists.length ? (
      playlists.map(playlist => {
        const { name, images, id } = playlist;
        return (
          <li key={id} className="playlist-item">
            <PlaylistLink name={name} image={images[0].url} playlistId={id} />
          </li>
        );
      })
    ) : (
      <div>No PlayLists </div>
    );

    return (
      <main className="profile">
        <ul className="playlists">{playlistsToRender}</ul>

        <Player playlistId={currentPlaylist && currentPlaylist.id} />
      </main>
    );
  }
}

const mapStateToProps = state => {
  const { playlists, loading, currentPlaylist } = state.playlists;
  return {
    playlists,
    loading,
    spotifyId: state.auth.userAuthInfo.spotifyId
  };
};

export default requiresLogin()(connect(mapStateToProps)(Profile));
