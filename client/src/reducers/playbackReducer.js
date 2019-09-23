import {
  SET_PLAYBACK_STATE_SUCCESS,
  START_SONG_REQUEST,
  START_SONG_ERROR
} from '../actions/playlists/soundActions';

import {
  FETCH_CURRENT_PLAYBACK_ERROR,
  FETCH_CURRENT_PLAYBACK_REQUEST,
  FETCH_CURRENT_PLAYBACK_SUCCESS
} from '../actions/playlists/playbackActions';

const initialState = {
  currentTrack: null,
  isPlaying: false,
  currentTrackProgress: 0
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_PLAYBACK_SUCCESS:
      return {
        ...state,
        isPlaying: action.playbackInfo.is_playing,
        currentTrack: action.playbackInfo.item,
        currentTrackProgress: action.playbackInfo.progress_ms
      };
    default:
      return state;
  }
}
