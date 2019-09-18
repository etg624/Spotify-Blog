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

  componentDidUpdate(prevProps) {
    if (prevProps.currentTrack !== this.props.currentTrack) {
      console.log(this.props.currentTrack, prevProps.currentTrack);
    }
  }

  render() {
    const { playlistId, dispatch, currentTrack, isPlaying } = this.props;
    console.log(currentTrack);
    return (
      <footer>
        <button onClick={() => dispatch(navigatePlaylist('previous'))}>
          PREVIOUS
        </button>
        <button
          onClick={() =>
            dispatch(
              setPlayingState(
                playlistId,
                currentTrack.id,
                true,
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
