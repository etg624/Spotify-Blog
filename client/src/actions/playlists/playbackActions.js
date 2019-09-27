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
  //todo fetch the current device first then access the player
  //if no device try to return message
  //if there is a device but is not playing ping
  // PUT https://api.spotify.com/v1/me/player
  // {
  //   "device_ids": [
  //     <deviceId>
  //   ]
  // }
  return fetch('https://api.spotify.com/v1/me/player', {
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
