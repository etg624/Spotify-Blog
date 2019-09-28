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
  const { accessToken } = getState().auth.userAuthInfo;

  return fetch('https://api.spotify.com/v1/me/player/', {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
    .then(res => {
      return res.json();
    })
    .then(playbackInfo => {
      return dispatch(fetchCurrentPlaybackSuccess(playbackInfo));
    })
    .catch(err => {
      console.log(err);
      return dispatch(fetchCurrentPlaybackError(err));
    });
};

export const setCurrentDevice = deviceId => (dispatch, getState) => {
  const { accessToken } = getState().auth.userAuthInfo;
  return fetch('https://api.spotify.com/v1/me/player', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({
      device_ids: [deviceId]
    })
  })
    .then(res => res.json())
    .then(data => console.log(data));
};
