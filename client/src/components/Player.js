import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStepForward,
  faStepBackward,
  faPauseCircle,
  faPlayCircle
} from '@fortawesome/free-solid-svg-icons';

import requiresLogin from './HOC/requiresLogin';
import {
  setPlayingState,
  navigatePlaylist
} from '../actions/playlists/soundActions';
import { fetchCurrentPlayback } from '../actions/playlists/playbackActions';
import { connect } from 'react-redux';
import '../styles/Player.css';

class Player extends Component {
  componentDidMount() {
    //get the current track right away
    this.props.dispatch(fetchCurrentPlayback());
  }

  componentDidUpdate(prevProps) {
    //stop or start the interval that fetches the current playback based on playback state i.e. paused or playing
    const { isPlaying, playerError, playbackError } = this.props;
    if (playbackError) {
      console.log(playerError);
      this.stopPlaybackInterval();
    }

    if (!prevProps.isPlaying && isPlaying) {
      //from paused to playing
      this.startPlaybackInterval();
    } else if (prevProps.isPlaying && !isPlaying) {
      //from playing to paused
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
      <footer className="player-container">
        <aside className="player-track-info">
          <p className="bold">{currentTrack && currentTrack.name}</p>
          <p>{currentTrack && currentTrack.artists[0].name}</p>
        </aside>
        <section className="player-state-controllers">
          <span className="player-state-control">
            <FontAwesomeIcon
              size="1x"
              icon={faStepBackward}
              onClick={() => dispatch(navigatePlaylist('previous'))}
            />
          </span>
          <span className="player-state-control">
            <FontAwesomeIcon
              size="2x"
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
              icon={isPlaying ? faPauseCircle : faPlayCircle}
            ></FontAwesomeIcon>
          </span>

          <span className="player-state-control">
            <FontAwesomeIcon
              size="1x"
              icon={faStepForward}
              onClick={() => dispatch(navigatePlaylist('next'))}
            />
          </span>
        </section>
      </footer>
    );
  }
}

const mapStateToProps = ({
  playback: { currentTrack, isPlaying, currentTrackProgress, error },
  player: { playerError }
}) => ({
  currentTrack,
  isPlaying,
  currentTrackProgress,
  playerError,
  playbackError: error
});

export default requiresLogin()(connect(mapStateToProps)(Player));
