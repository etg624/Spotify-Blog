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
    //get the current track right away
    this.props.dispatch(fetchCurrentPlayback());
  }

  componentDidUpdate(prevProps) {
    //stop or start the interval that fetches the current playback based on playback state i.e. paused or playing
    const { isPlaying } = this.props;
    if (!prevProps.isPlaying && isPlaying) {
      //playing
      this.startPlaybackInterval();
    } else if (prevProps.isPlaying && !isPlaying) {
      //paused
      this.stopPlaybackInterval();
    }
  }

  componentWillUnmount() {
    this.stopPlaybackInterval();
  }

  startPlaybackInterval() {
    this.timer = setInterval(
      () => this.props.dispatch(fetchCurrentPlayback()),
      1000 //fetch the current state of the playback every second
    );
  }

  stopPlaybackInterval() {
    if (!this.timer) {
      return;
    }
    clearInterval(this.timer);
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
                // currentTrack ? true : false,
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
