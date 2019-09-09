import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserPlaylists } from '../actions/userActions/fetchPlaylists';

class Profile extends Component {
  componentDidMount() {
    const { currentUser, dispatch } = this.props;

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
  if (state.user.currentUser) {
    const { playlists, currentUser } = state.user;
    return {
      currentUser,
      playlists
    };
  }
  return state;
};

export default connect(mapStateToProps)(Profile);
