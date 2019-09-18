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
  isPlaying: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // case SET_PLAYBACK_STATE_SUCCESS:
    //   console.log(action);
    //   return {
    //     ...state,
    //     currentTrack: action.trackId,
    //     isPlaying: action.currentState === 'play' ? true : false
    //   };

    case FETCH_CURRENT_PLAYBACK_SUCCESS:
      console.log(action.playbackInfo.is_playing);
      return {
        ...state,
        isPlaying: action.playbackInfo.is_playing,
        currentTrack: action.playbackInfo.item
      };
    default:
      return state;
  }
}
