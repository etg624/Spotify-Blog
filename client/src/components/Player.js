import React, { Component } from 'react';
import requiresLogin from './HOC/requiresLogin';
import {
  setPlayingState,
  navigatePlaylist
} from '../actions/playlists/soundActions';
import { fetchCurrentPlayback } from '../actions/playlists/playbackActions';
import { connect } from 'react-redux';
import store from '../store';

class Player extends Component {
  componentDidMount() {
    this.timer = setInterval(
      () => this.props.dispatch(fetchCurrentPlayback()),
      900
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const {
      playlistId,
      dispatch,
      currentTrack,
      isPlaying,
      currentTrackProgress
    } = this.props;

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

const mapStateToProps = ({
  playback: { currentTrack, isPlaying, currentTrackProgress }
}) => ({
  currentTrack,
  isPlaying,
  currentTrackProgress
});

export default requiresLogin()(connect(mapStateToProps)(Player));
