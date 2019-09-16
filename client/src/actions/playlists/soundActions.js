import decodeJWT from 'jwt-decode';

export const START_SONG_REQUEST = 'START_SONG_REQUEST';
export const startSongRequest = () => ({
  type: START_SONG_REQUEST
});
export const START_SONG_ERROR = 'START_SONG_ERROR';
export const startSongError = playlistId => ({
  type: START_SONG_ERROR,
  playlistId
});

export const START_PLAYLIST_SUCCESS = 'START_PLAYLIST_SUCCESS';
export const startPlaylistSuccess = () => ({
  type: START_PLAYLIST_SUCCESS
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
  }).then(() => dispatch(navigatePlaylistSuccess(direction)));
};

export const startPlaylist = (playlistId, playlistState) => (
  dispatch,
  getState
) => {
  dispatch(startSongRequest());
  const { authToken } = getState().auth;
  const { accessToken } = decodeJWT(authToken).user;

  return fetch(`https://api.spotify.com/v1/me/player/${playlistState}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      context_uri: `spotify:playlist:${playlistId}`,
      offset: {
        position: 0
      },
      position_ms: 0
    })
  })
    .then(() => dispatch(startPlaylistSuccess()))
    .catch(err => console.log(err));
};