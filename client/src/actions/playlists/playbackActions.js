import decodeJWT from 'jwt-decode';

export const FETCH_CURRENT_PLAYBACK_REQUEST = 'FETCH_CURRENT_PLAYBACK_REQUEST';
export const fetchCurrentPlaybackRequest = () => ({
  type: FETCH_CURRENT_PLAYBACK_REQUEST
});

export const FETCH_CURRENT_PLAYBACK_SUCCESS = 'FETCH_CURRENT_PLAYBACK_SUCCESS';
export const fetchCurrentPlaybackSuccess = playbackInfo => ({
  type: FETCH_CURRENT_PLAYBACK_SUCCESS,
  playbackInfo
});

export const FETCH_CURRENT_PLAYBACK_ERROR = 'FETCH_CURRENT_PLAYBACK_ERROR';
export const fetchCurrentPlaybackError = error => ({
  type: FETCH_CURRENT_PLAYBACK_ERROR,
  error
});

export const fetchCurrentPlayback = () => (dispatch, getState) => {
  const { authToken } = getState().auth;
  const { accessToken } = decodeJWT(authToken).user;

  return fetch('https://api.spotify.com/v1/me/player', {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
    .then(res => res.json())
    .then(playbackInfo => dispatch(fetchCurrentPlaybackSuccess(playbackInfo)))
    .catch(err => {
      console.log(err);
      dispatch(fetchCurrentPlaybackError(err));
    });
};
