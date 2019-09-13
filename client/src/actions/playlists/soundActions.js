import decodeJWT from 'jwt-decode';

export const START_PLAYLIST_REQUEST = 'START_PLAYLIST_REQUEST';
export const startPlaylistRequest = () => ({
  type: START_PLAYLIST_REQUEST
});

export const START_PLAYLIST_SUCCESS = 'START_PLAYLIST_SUCCESS';
export const startPlaylistSuccess = playlistId => ({
  type: START_PLAYLIST_SUCCESS,
  playlistId
});

export const START_PLAYLIST_ERROR = 'START_PLAYLIST_ERROR';
export const startPlaylistError = playlistId => ({
  type: START_PLAYLIST_ERROR,
  playlistId
});

export const startPlaylist = playlistId => (dispatch, getState) => {
  dispatch(startPlaylistRequest());
  const { authToken } = getState().auth;
  const { accessToken } = decodeJWT(authToken).user;

  return fetch('https://api.spotify.com/v1/me/player/play', {
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
    .then(res => res.json())
    .then(() => dispatch(startPlaylistSuccess()));
};
