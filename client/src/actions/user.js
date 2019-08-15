import { SPOTIFY_BASE_URL } from '../config';

export const FETCH_USER_PLAYLISTS_REQUEST = 'FETCH_USER_PLAYLISTS_REQUEST';
export const FETCH_USER_PLAYLISTS_SUCCESS = 'FETCH_USER_PLAYLISTS_SUCCESS';
export const FETCH_USER_PLAYLISTS_ERROR = 'FETCH_USER_PLAYLISTS_ERROR';

export const fetchUserPlaylistsSuccess = playlists => ({
  type: FETCH_USER_PLAYLISTS_SUCCESS,
  playlists
});

export const fetchUserPlaylists = (spotifyId, accessToken) => (
  dispatch,
  getState
) => {
  // const { accessToken } = getState().auth.currentUser.accessToken;

  return fetch(`${SPOTIFY_BASE_URL}/users/${spotifyId}/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(res => res.json())
    .then(playlists => dispatch(fetchUserPlaylistsSuccess(playlists)));
};
