import {
  FETCH_CURRENT_PLAYBACK_ERROR,
  FETCH_CURRENT_PLAYBACK_SUCCESS
} from '../actions/playlists/soundActions/playbackActions';

const initialState = {
  currentTrack: null,
  isPlaying: false,
  currentTrackProgress: 0,
  currentDevice: null,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_PLAYBACK_SUCCESS:
      const { is_playing, item, progress_ms, device } = action.playbackInfo;

      return {
        ...state,
        isPlaying: is_playing,
        currentTrack: item,
        currentTrackProgress: progress_ms,
        currentDevice: device
      };
    case FETCH_CURRENT_PLAYBACK_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
}
