import {
  SET_PLAYBACK_STATE_SUCCESS,
  START_SONG_REQUEST,
  START_SONG_ERROR
} from '../actions/playlists/soundActions';

const initialState = {
  currentTrack: null,
  isPlaying: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYBACK_STATE_SUCCESS:
      console.log(action);
      return {
        ...state,
        currentTrack: action.trackId,
        isPlaying: action.currentState === 'play' ? true : false
      };

    default:
      return state;
  }
}
