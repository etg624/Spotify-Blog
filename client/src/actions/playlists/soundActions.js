import { fetchCurrentPlayback } from './playbackActions';
import { normalizeResponseErrors } from '../../helpers/normalizeResponseErrors';

export const SET_PLAYBACK_STATE_ERROR = 'SET_PLAYBACK_STATE_ERROR';
export const setPlaybackStateError = error => ({
  type: SET_PLAYBACK_STATE_ERROR,
  error
});

export const SET_PLAYBACK_STATE_SUCCESS = 'SET_PLAYBACK_STATE_SUCCESS';
export const setPlaybackStateSuccess = (playlistId, currentState) => ({
  type: SET_PLAYBACK_STATE_SUCCESS,
  playlistId,
  currentState
});

export const NAVIGATE_PLAYLIST_SUCCESS = 'NAVIGATE_PLAYLIST';
export const navigatePlaylistSuccess = direction => ({
  type: NAVIGATE_PLAYLIST_SUCCESS,
  direction
});
export const PLAYER_ERROR = 'PLAYER_ERROR';
export const playerError = error => ({
  type: PLAYER_ERROR,
  error
});

export const navigatePlaylist = direction => (dispatch, getState) => {
  const { accessToken } = getState().auth.userAuthInfo;

  return fetch(`https://api.spotify.com/v1/me/player/${direction}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json'
    }
  })
    .then(() => dispatch(navigatePlaylistSuccess(direction)))
    .catch(err => playerError(err))
    .then(() => dispatch(fetchCurrentPlayback()));
};

export const setPlayingState = (playlistId, trackId, playingState) => (
  dispatch,
  getState
) => {
  const { accessToken } = getState().auth.userAuthInfo;
  const { currentTrackProgress, isPlaying } = getState().playback;
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      context_uri: `spotify:playlist:${playlistId}`,
      offset: { uri: `spotify:track:${trackId}` },
      // if the track is not playing then it is paused and
      //we need to start where we left off
      // else its a new track start from 0
      position_ms: !isPlaying ? currentTrackProgress : 0
    })
  };

  return fetch(`https://api.spotify.com/v1/me/player/${playingState}`, options)
    .then(res => normalizeResponseErrors(res))
    .then(() => {
      return dispatch(setPlaybackStateSuccess(playlistId, playingState));
    })
    .then(() => dispatch(fetchCurrentPlayback()))
    .catch(err => {
      console.log(err);
      dispatch(playerError(err));
    });
};

export const FETCH_AVAILABLE_DEVICES_SUCCESS =
  'FETCH_AVAILABLE_DEVICES_SUCCESS';
export const fetchAvailableDevicesSuccess = devices => ({
  type: FETCH_AVAILABLE_DEVICES_SUCCESS,
  devices
});
export const fetchAvailableDevices = () => (dispatch, getState) => {
  const { accessToken } = getState().auth.userAuthInfo;
  return fetch('https://api.spotify.com/v1/me/player/devices', {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
    .then(res => {
      return res.json();
    })
    .then(({ devices }) => dispatch(fetchAvailableDevicesSuccess(devices)));
};
