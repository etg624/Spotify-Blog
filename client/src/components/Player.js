import React, { Component } from 'react';
import requiresLogin from './HOC/requiresLogin';
import {
  setPlayingState,
  navigatePlaylist
} from '../actions/playlists/soundActions';
import { fetchCurrentPlayback } from '../actions/playlists/playbackActions';
import { connect } from 'react-redux';
class Player extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCurrentPlayback());
  }

  render() {
    const { playlistId, dispatch, currentTrack, isPlaying } = this.props;

    return (
      <footer>
        <img src={currentTrack && currentTrack.album.images[1].url} alt="" />
        <p>{currentTrack && currentTrack.name}</p>
        <button onClick={() => dispatch(navigatePlaylist('previous'))}>
          PREVIOUS
        </button>
        <button
          onClick={() =>
            dispatch(
              setPlayingState(
                playlistId,
                currentTrack ? currentTrack.id : null,
                currentTrack ? true : false,
                `${isPlaying ? 'pause' : 'play'}`
              )
            )
          }
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <button onClick={() => dispatch(navigatePlaylist('next'))}>NEXT</button>
      </footer>
    );
  }
}

const mapStateToProps = ({ playback: { currentTrack, isPlaying } }) => ({
  currentTrack,
  isPlaying
});

export default requiresLogin()(connect(mapStateToProps)(Player));
