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
  navigatePlaylist,
  fetchAvailableDevices
} from '../actions/playlists/soundActions/playerActions';
import {
  fetchCurrentPlayback,
  setCurrentDevice
} from '../actions/playlists/soundActions/playbackActions';
import { connect } from 'react-redux';
import '../styles/Player.css';

class Player extends Component {
  componentDidMount() {
    //get the current track right away

    const { dispatch } = this.props;
    dispatch(fetchAvailableDevices());
    dispatch(fetchCurrentPlayback());
  }
  componentDidUpdate(prevProps) {
    //stop or start the interval that fetches the current playback based on playback state i.e. paused or playing
    const { isPlaying, playbackError, playerError, currentTrack } = this.props;

    if (!prevProps.isPlaying && isPlaying && currentTrack) {
      //from paused to playing
      this.startPlaybackInterval();
    } else if (prevProps.isPlaying && !isPlaying) {
      //from playing to paused
      this.stopPlaybackInterval();
    } else if (prevProps.currentTrack && !currentTrack) {
      this.stopPlaybackInterval();
    } else if (playbackError || playerError) {
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

  playButton() {
    const {
      currentlyPlayingPlaylist,
      currentPlaylistInView,
      dispatch,
      currentTrack,
      isPlaying
    } = this.props;

    dispatch(
      setPlayingState(
        currentlyPlayingPlaylist
          ? currentlyPlayingPlaylist
          : currentPlaylistInView,
        currentTrack.id,
        `${isPlaying ? 'pause' : 'play'}`
      )
    );
  }
  render() {
    const {
      dispatch,
      currentTrack,
      isPlaying,
      playerError,
      availableDevices,
      currentDevice,
      action
    } = this.props;

    const playerLogic = (
      <>
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
        ) : currentTrack && !playerError ? (
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
                onClick={() => this.playButton()}
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
        ) : playerError && availableDevices.length ? (
          <section>
            <span>{playerError.message.split(':')[1]}</span>
            <div>
              <select
                onChange={e => dispatch(setCurrentDevice(e.target.value))}
              >
                <option>Select the device you would like to play on</option>
                {availableDevices.map(device => {
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
          ''
        )}
      </>
    );

    return (
      <>
        <aside className="player-track-info">
          <p className="bold">{currentTrack && currentTrack.name}</p>
          <p>{currentTrack && currentTrack.artists[0].name}</p>
        </aside>
        <>{playerLogic}</>

        {availableDevices.length && currentDevice ? (
          <aside className="player-current-device">
            Playing on {currentDevice && currentDevice.name}
          </aside>
        ) : (
          ''
        )}
      </>
    );
  }
}

const mapStateToProps = ({
  playback: {
    currentTrack,
    isPlaying,
    currentTrackProgress,
    error,
    currentDevice
  },
  player: { playerError, availableDevices, currentlyPlayingPlaylist, action },
  auth: { authToken }
}) => ({
  currentDevice,
  currentlyPlayingPlaylist,
  currentTrack,
  isPlaying,
  currentTrackProgress,
  playerError,
  playbackError: error,
  authToken,
  availableDevices,
  action
});

export default requiresLogin()(connect(mapStateToProps)(Player));
