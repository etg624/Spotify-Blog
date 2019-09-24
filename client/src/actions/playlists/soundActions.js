import decodeJWT from 'jwt-decode';
import { fetchCurrentPlayback } from './playbackActions';
import { normalizeResponseErrors } from '../../helpers/normalizeResponseErrors';

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
      //if user clicked a track in the depths of the playlist start from there
      //otherwise start at the beginning of the playlist
      offset: isTrack ? { uri: `spotify:track:${trackId}` } : { position: 0 },
      // if the track is not playing then it is paused and
      //we need to start where we left off
      // else its a new track start from 0
      position_ms: !getState().playback.isPlaying
        ? getState().playback.currentTrackProgress
        : 0
    })
  };

  return fetch(`https://api.spotify.com/v1/me/player/${playingState}`, options)
    .then(res => normalizeResponseErrors(res))
    .then(() => dispatch(setPlaybackStateSuccess(trackId, playingState)))
    .then(() => dispatch(fetchCurrentPlayback()))
    .catch(err => {
      console.log(err);
      dispatch(setPlaybackStateError(err));
    });
};
