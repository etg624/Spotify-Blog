import { API_BASE_URL } from '../config';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const REFRESH_ACCESS_TOKEN_SUCCESS = 'REFRESH_ACCESS_TOKEN_SUCCESS';

export const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });
export const fetchUserSuccess = user => ({ type: FETCH_USER_SUCCESS, user });
export const fetchUserError = err => ({ type: FETCH_USER_ERROR, err });
export const refreshAccessTokenSuccess = accessToken => ({
  type: REFRESH_ACCESS_TOKEN_SUCCESS,
  accessToken
});

export const fetchUser = user => (dispatch, getState) => {
  dispatch(fetchUserRequest());
  return fetch(`${API_BASE_URL}/user/${user}`)
    .then(res => res.json())
    .then(user => dispatch(fetchUserSuccess(user)));
};

export const refreshAccessToken = spotifyId => (dispatch, getState) => {
  fetch(`${API_BASE_URL}/user/${spotifyId}/refresh`, {})
    .then(res => res.json())
    .then(({ accessToken }) =>
      dispatch(refreshAccessTokenSuccess(accessToken))
    );
};
