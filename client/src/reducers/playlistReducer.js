import {
  FETCH_USER_PLAYLISTS_ERROR,
  FETCH_USER_PLAYLISTS_SUCCESS,
  FETCH_USER_PLAYLISTS_REQUEST
} from '../actions/playlists/fetchPlaylists';

import { REFRESH_ACCESS_TOKEN_SUCCESS } from '../actions/auth';

const initialState = {
  playlists: [],
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_PLAYLISTS_REQUEST:
      return { ...state, loading: true, error: null };
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
