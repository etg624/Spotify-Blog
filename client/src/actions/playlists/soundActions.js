import decodeJWT from 'jwt-decode';
import { fetchCurrentPlayback } from './playbackActions';

export const SET_PLAYBACK_STATE_REQUEST = 'SET_PLAYBACK_STATE_REQUEST';
export const setPlaybackStateRequest = () => ({
  type: SET_PLAYBACK_STATE_REQUEST
});

export const SET_PLAYBACK_STATE_ERROR = 'SET_PLAYBACK_STATE_ERROR';
export const setPlaybackStateError = error => ({
  type: SET_PLAYBACK_STATE_ERROR,
  error
});

export const SET_PLAYBACK_STATE_SUCCESS = 'SET_PLAYBACK_STATE_SUCCESS';
export const setPlaybackStateSuccess = (trackId, currentState) => ({
  type: SET_PLAYBACK_STATE_SUCCESS,
  trackId,
  currentState
});

export const NAVIGATE_PLAYLIST_SUCCESS = 'NAVIGATE_PLAYLIST';
export const navigatePlaylistSuccess = direction => ({
  type: NAVIGATE_PLAYLIST_SUCCESS,
  direction
});

export const navigatePlaylist = direction => (dispatch, getState) => {
  const { authToken } = getState().auth;
  const { accessToken } = decodeJWT(authToken).user;

  return fetch(`https://api.spotify.com/v1/me/player/${direction}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json'
    }
  })
    .then(() => dispatch(navigatePlaylistSuccess(direction)))
    .then(() => dispatch(fetchCurrentPlayback()));
};

export const GET_CURRENT_TRACK_MILLISECOND_POSITION_SUCCESS =
  'GET_CURRENT_TRACK_MILLISECOND_POSITION_SUCCESS';
export const getCurrentTrackMillisecondPositionSuccess = ms => ({
  type: GET_CURRENT_TRACK_MILLISECOND_POSITION_SUCCESS,
  ms
});
export const getCurrentTrackMillisecondPosition = accessToken => {
  return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
    .then(res => res.json())
    .then(data => JSON.stringify(data.progress_ms));
};

export const setPlayingState = (playlistId, trackId, isTrack, playingState) => (
  dispatch,
  getState
) => {
  dispatch(setPlaybackStateRequest());
  const { authToken } = getState().auth;
  const { accessToken } = decodeJWT(authToken).user;
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      context_uri: `spotify:playlist:${playlistId}`,
      offset: isTrack ? { uri: `spotify:track:${trackId}` } : { position: 0 },
      position_ms: getState().playback.currentTrackProgress
    })
  };

  return fetch(`https://api.spotify.com/v1/me/player/${playingState}`, options)
    .then(() => dispatch(setPlaybackStateSuccess(trackId, playingState)))
    .then(() => dispatch(fetchCurrentPlayback()))
    .catch(err => {
      console.log(err);
      dispatch(setPlaybackStateError(err));
    });
};
