import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        return <li key={track.id}>{track.name}</li>;
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