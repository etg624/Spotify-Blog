import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from './Loading';
import { fetchPlaylistTracks } from '../actions/playlists/fetchPlaylistTracks';
import { setPlayingState } from '../actions/playlists/soundActions/playerActions';
import Table from './Table';
import requiresLogin from './HOC/requiresLogin';
import '../styles/Playlist.css';

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

  setTrackPlayingState(trackId) {
    const { dispatch, currentPlaylistInView } = this.props;
    return dispatch(setPlayingState(currentPlaylistInView.id, trackId, 'play'));
  }

  render() {
    const {
      loading,
      isPlaying,
      currentTrack,
      currentPlaylistInView: { tracks }
    } = this.props;

    if (loading) {
      return <Loading />;
    }
    return (
      <main className="tracks-page">
        <section className="tracks-container">
          <Table
            tracks={tracks}
            setTrackPlayingState={this.setTrackPlayingState}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
          />
        </section>
      </main>
    );
  }
}

const mapStateToProps = ({
  playlists: { currentPlaylistInView, loading },
  playback: { isPlaying, currentTrack }
}) => {
  return {
    currentPlaylistInView,
    loading,
    isPlaying,
    currentTrack
  };
};
export default requiresLogin()(connect(mapStateToProps)(Playlist));
