import {
  FETCH_USER_PLAYLISTS_ERROR,
  FETCH_USER_PLAYLISTS_SUCCESS,
  FETCH_USER_PLAYLISTS_REQUEST
} from '../actions/user';

const initialState = {
  playlists: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_PLAYLISTS_SUCCESS:
      return {
        ...state,
        playlists: [...state.playlists, ...action.playlists.items]
      };

    default:
      return state;
  }
}
