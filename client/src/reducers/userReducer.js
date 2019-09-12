import {
  FETCH_USER_PLAYLISTS_ERROR,
  FETCH_USER_PLAYLISTS_SUCCESS,
  FETCH_USER_PLAYLISTS_REQUEST
} from '../actions/userActions/fetchPlaylists';

import { REFRESH_ACCESS_TOKEN_SUCCESS } from '../actions/auth';
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_ERROR
} from '../actions/userActions/fetchUser';

const initialState = {
  playlists: [],
  currentUser: null,
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        currentUser: { ...state.currentUser, accessToken: action.accessToken }
      };
    case FETCH_USER_PLAYLISTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_SUCCESS:
      return { ...state, currentUser: action.user, loading: false };
    case FETCH_USER_ERROR:
      return { ...state, loading: false, error: action.error };
    case FETCH_USER_PLAYLISTS_SUCCESS:
      return {
        ...state,
        playlists: [...state.playlists, ...action.playlists.items]
      };
    case FETCH_USER_PLAYLISTS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
}
