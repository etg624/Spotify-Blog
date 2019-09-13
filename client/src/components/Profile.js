import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserPlaylists } from '../actions/userActions/fetchPlaylists';

import requiresLogin from './HOC/requiresLogin';
import '../styles/Profile.css';

class Profile extends Component {
  componentDidMount() {
    const { currentUser, dispatch } = this.props;

    return dispatch(fetchUserPlaylists(currentUser));
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
            <header className="playlist-item-name">
              <h2>{name.length <= 30 ? name : `${name.slice(0, 30)}...`}</h2>
            </header>

            <section className="playlist-item-img-container">
              <img
                className="playlist-item-img"
                src={images[0].url}
                alt={`Album art for ${name} playlist`}
              />
            </section>
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
  // console.log(state);

  const { playlists, loading } = state.user;

  return {
    playlists,
    loading,
    currentUser: state.auth.userAuthInfo.spotifyId
  };
};

export default requiresLogin()(connect(mapStateToProps)(Profile));
