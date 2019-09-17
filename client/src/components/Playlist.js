import React, { Component } from 'react';
import { connect } from 'react-redux';

import Player from './Player';
import Loading from './Loading';
import { fetchPlaylistTracks } from '../actions/playlists/fetchPlaylistTracks';
import { setPlayingState } from '../actions/playlists/soundActions';
import Table from './Table';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.setTrackPlayingState = this.setTrackPlayingState.bind(this);
  }

  componentDidMount() {
    const {
      dispatch,
      match: { params }
    } = this.props;
    dispatch(fetchPlaylistTracks(params.id));
  }

  setTrackPlayingState(id) {
    const { dispatch, currentPlaylist } = this.props;
    return dispatch(setPlayingState(currentPlaylist.id, id, true, 'play'));
  }

  render() {
    const {
      loading,
      currentPlaylist: { tracks, id }
    } = this.props;

    if (loading) {
      return <Loading />;
    }
    return (
      <main className="tracks-page">
        <section className="tracks-container">
          <Table data={tracks} startTrack={this.setTrackPlayingState} />
          <Player playlistId={id} />
        </section>
      </main>
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
export default connect(mapStateToProps)(Playlist);
