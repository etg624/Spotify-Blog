import { API_BASE_URL } from '../../config';
import jwtDecode from 'jwt-decode';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const REFRESH_ACCESS_TOKEN_SUCCESS = 'REFRESH_ACCESS_TOKEN_SUCCESS';

export const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });
export const fetchUserSuccess = user => ({ type: FETCH_USER_SUCCESS, user });
export const fetchUserError = err => ({ type: FETCH_USER_ERROR, err });

export const fetchUser = authToken => dispatch => {
  const decodedJwtToken = jwtDecode(authToken);
  const { spotifyId } = decodedJwtToken.user;
  dispatch(fetchUserRequest());

  return fetch(`${API_BASE_URL}/user/${spotifyId}`, {
    headers: { Authorization: `Bearer ${authToken}` }
  })
    .then(res => res.json())
    .then(_user => {
      return dispatch(fetchUserSuccess(_user));
    });
};
