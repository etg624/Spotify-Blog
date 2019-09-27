import {
  SET_PLAYBACK_STATE_SUCCESS,
  PLAYER_ERROR,
  NAVIGATE_PLAYLIST_SUCCESS
} from '../actions/playlists/soundActions';

const initialState = {
  action: '',
  playerError: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYBACK_STATE_SUCCESS:
      return { ...state, action: action.currentState };
    case NAVIGATE_PLAYLIST_SUCCESS:
      return { ...state, action: action.direction };
    case PLAYER_ERROR:
      return { ...state, playerError: action.error };
    default:
      return state;
  }
}
