import { SPOTIFY_BASE_URL } from '../../config';
import { clearAuth } from '../auth';
import decodeJWT from 'jwt-decode';
export const FETCH_USER_PLAYLISTS_REQUEST = 'FETCH_USER_PLAYLISTS_REQUEST';
export const FETCH_USER_PLAYLISTS_SUCCESS = 'FETCH_USER_PLAYLISTS_SUCCESS';
export const FETCH_USER_PLAYLISTS_ERROR = 'FETCH_USER_PLAYLISTS_ERROR';

export const fetchUserPlaylistsSuccess = playlists => ({
  type: FETCH_USER_PLAYLISTS_SUCCESS,
  playlists
});

export const fetchUserPlaylistsRequest = () => {
  return { type: FETCH_USER_PLAYLISTS_REQUEST };
};

export const fetchUserPlaylistsError = error => ({
  type: FETCH_USER_PLAYLISTS_ERROR,
  error
});

export const fetchUserPlaylists = spotifyId => (dispatch, getState) => {
  const { authToken } = getState().auth;

  const { accessToken } = decodeJWT(authToken).user;

  dispatch(fetchUserPlaylistsRequest());

  return fetch(`${SPOTIFY_BASE_URL}/users/${spotifyId}/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(res => {
      return res.json();
    })
    .then(playlists => {
      dispatch(fetchUserPlaylistsSuccess(playlists));
    })
    .catch(err => {
      dispatch(clearAuth());
      dispatch(fetchUserPlaylistsError(err));
    });
};
