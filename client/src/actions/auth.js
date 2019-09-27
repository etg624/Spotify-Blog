import { API_BASE_URL } from '../config';
import { setItemInLocalStorage } from '../helpers/local-storage';
import jwtDecode from 'jwt-decode';

export const REFRESH_AUTH_TOKEN_SUCCESS = 'REFRESH_AUTH_TOKEN_SUCCESS';
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const CLEAR_AUTH = 'CLEAR_AUTH';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

export const setAuthToken = authToken => ({ type: SET_AUTH_TOKEN, authToken });
export const clearAuth = () => ({ type: CLEAR_AUTH });
export const authRequest = () => ({ type: AUTH_REQUEST });
export const authSuccess = userAuthInfo => ({
  type: AUTH_SUCCESS,
  userAuthInfo
});
export const authError = error => ({ type: AUTH_ERROR, error });
export const refreshAuthTokenSuccess = authToken => ({
  type: REFRESH_AUTH_TOKEN_SUCCESS,
  authToken
});

export const storeJWT = (authToken, dispatch) => {
  try {
    const decodedToken = jwtDecode(authToken);

    dispatch(setAuthToken(authToken));
    dispatch(authSuccess(decodedToken.user));
    setItemInLocalStorage('authToken', authToken);
  } catch (e) {
    console.log(e.message);
  }
};

export const refreshAuthToken = spotifyId => (dispatch, getState) => {
  const authToken = localStorage.getItem('authToken');

  fetch(`${API_BASE_URL}/user/${spotifyId}/refresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(({ authToken }) => {
      return storeJWT(authToken, dispatch);
    });
};
