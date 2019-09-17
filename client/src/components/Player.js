import React from 'react';
import {
  setPlayingState,
  navigatePlaylist
} from '../actions/playlists/soundActions';
import { connect } from 'react-redux';
function Player(props) {
  const { playlistId, dispatch } = props;
  return (
    <footer>
      <button onClick={() => dispatch(navigatePlaylist('previous'))}>
        PREVIOUS
      </button>
      <button
        onClick={() =>
          dispatch(setPlayingState(playlistId, null, false, 'play'))
        }
      >
        PLAY
      </button>
      <button
        onClick={() =>
          dispatch(setPlayingState(playlistId, null, false, 'pause'))
        }
      >
        PAUSE
      </button>
      <button onClick={() => dispatch(navigatePlaylist('next'))}>NEXT</button>
    </footer>
  );
}

export default connect()(Player);
