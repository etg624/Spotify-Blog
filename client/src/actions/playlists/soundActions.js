import decodeJWT from 'jwt-decode';
import { fetchCurrentPlayback } from './playbackActions';

export const START_SONG_REQUEST = 'START_SONG_REQUEST';
export const startSongRequest = () => ({
  type: START_SONG_REQUEST
});

export const START_SONG_ERROR = 'START_SONG_ERROR';
export const startSongError = error => ({
  type: START_SONG_ERROR,
  error
});

export const SET_PLAYBACK_STATE_SUCCESS = 'SET_PLAYBACK_STATE_SUCCESS';
export const setPlayBackStateSuccess = (trackId, currentState) => ({
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

export const setPlayingState = (playlistId, trackId, isTrack, playingState) => (
  dispatch,
  getState
) => {
  dispatch(startSongRequest());
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
      position_ms: 0
    })
  };

  return fetch(`https://api.spotify.com/v1/me/player/${playingState}`, options)
    .then(() => dispatch(setPlayBackStateSuccess(trackId, playingState)))
    .then(() => dispatch(fetchCurrentPlayback()))
    .catch(err => {
      console.log(err);
      dispatch(startSongError(err));
    });
};
