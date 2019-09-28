import {
  SET_PLAYBACK_STATE_SUCCESS,
  PLAYER_ERROR,
  NAVIGATE_PLAYLIST_SUCCESS
} from '../actions/playlists/soundActions';

import { FETCH_AVAILABLE_DEVICES_SUCCESS } from '../actions/playlists/soundActions';

const initialState = {
  action: '',
  playerError: null,
  availableDevices: [],
  currentPlaylist: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYBACK_STATE_SUCCESS:
      return {
        ...state,
        action: action.currentState,
        currentlyPlayingPlaylist: action.playlistId
      };
    case NAVIGATE_PLAYLIST_SUCCESS:
      return { ...state, action: action.direction };
    case PLAYER_ERROR:
      return { ...state, playerError: action.error };
    case FETCH_AVAILABLE_DEVICES_SUCCESS:
      return {
        ...state,
        availableDevices: [...action.devices]
      };
    default:
      return state;
  }
}
