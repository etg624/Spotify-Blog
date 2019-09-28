import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwtDecode from 'jwt-decode';
import {
  faStepForward,
  faStepBackward,
  faPauseCircle,
  faPlayCircle
} from '@fortawesome/free-solid-svg-icons';

import requiresLogin from './HOC/requiresLogin';
import {
  setPlayingState,
  navigatePlaylist,
  fetchAvailableDevices
} from '../actions/playlists/soundActions';
import {
  fetchCurrentPlayback,
  setCurrentDevice
} from '../actions/playlists/playbackActions';
import { connect } from 'react-redux';
import '../styles/Player.css';

class Player extends Component {
  componentDidMount() {
    //get the current track right away
    const { accessToken } = jwtDecode(this.props.authToken).user;
    const { dispatch } = this.props;
    dispatch(fetchAvailableDevices());
    dispatch(fetchCurrentPlayback());
  }
  componentDidUpdate(prevProps) {
    //stop or start the interval that fetches the current playback based on playback state i.e. paused or playing
    const { isPlaying, playerError, playbackError, currentTrack } = this.props;

    if (!prevProps.isPlaying && isPlaying) {
      //from paused to playing
      this.startPlaybackInterval();
    } else if (prevProps.isPlaying && !isPlaying) {
      //from playing to paused
      this.stopPlaybackInterval();
    } else if (prevProps.currentTrack && !currentTrack) {
      this.stopPlaybackInterval();
    } else if (playbackError) {
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
    const {
      currentlyPlayingPlaylist,
      dispatch,
      currentTrack,
      isPlaying,
      playerError,
      availableDevices
    } = this.props;
    console.log(this.props);
    return (
      <>
        <aside className="player-track-info">
          <p className="bold">{currentTrack && currentTrack.name}</p>
          <p>{currentTrack && currentTrack.artists[0].name}</p>
        </aside>
        {!availableDevices.length ? (
          <section className="player-state-message">
            <>
              <div>
                Must have spotify running in the background... Planning on
                playing sample if no spotify is running
              </div>
            </>
          </section>
        ) : !currentTrack && !playerError ? (
          <section className="player-state-message">
            <span>Double click a song to start playing</span>
          </section>
        ) : playerError && availableDevices.length ? (
          <section>
            <span>{playerError.message.split(':')[1]}</span>
            <div>
              <select
                onChange={e => dispatch(setCurrentDevice(e.target.value))}
              >
                <option>Select the device you would like to play on</option>
                {availableDevices.map(device => {
                  console.log(device);
                  return (
                    <option key={device.id} value={device.id}>
                      {device.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </section>
        ) : (
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
                      currentlyPlayingPlaylist,
                      currentTrack.id,
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
        )}
      </>
    );
  }
}

const mapStateToProps = ({
  playback: { currentTrack, isPlaying, currentTrackProgress, error },
  player: { playerError, availableDevices, currentlyPlayingPlaylist },
  auth: { authToken }
}) => ({
  currentlyPlayingPlaylist,
  currentTrack,
  isPlaying,
  currentTrackProgress,
  playerError,
  playbackError: error,
  authToken,
  availableDevices
});

export default requiresLogin()(connect(mapStateToProps)(Player));
