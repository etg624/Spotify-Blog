import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';
import Player from './Player';
import Loading from './Loading';
import { fetchPlaylistTracks } from '../actions/playlists/fetchPlaylistTracks';

class Tracks extends Component {
  componentDidMount() {
    const {
      dispatch,
      match: { params }
    } = this.props;
    dispatch(fetchPlaylistTracks(params.id));
  }

  render() {
    const {
      loading,
      currentPlaylist: { tracks, id }
    } = this.props;
    if (loading) {
      return <Loading />;
    }

    const tracksToRender =
      tracks &&
      tracks.map(track => {
        console.log(track);

        return (
          <li>
            {track.name}
            <p>{track.id}</p>
            <p>{track.album.id}</p>
          </li>
        );
      });
    return (
      <div>
        {tracksToRender}
        <Player playlistId={id} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentPlaylist, loading } = state.playlists;
  return {
    currentPlaylist,
    loading
  };
};
export default connect(mapStateToProps)(Tracks);
