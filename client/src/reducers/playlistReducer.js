import {
  FETCH_USER_PLAYLISTS_ERROR,
  FETCH_USER_PLAYLISTS_SUCCESS,
  FETCH_USER_PLAYLISTS_REQUEST
} from '../actions/playlists/fetchPlaylists';

import {
  FETCH_PLAYLIST_TRACKS_ERROR,
  FETCH_PLAYLIST_TRACKS_REQUEST,
  FETCH_PLAYLIST_TRACKS_SUCCESS
} from '../actions/playlists/fetchPlaylistTracks';

const initialState = {
  playlists: [],
  currentPlaylist: {},
  loading: false,
  error: null,
  modalOpen: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_PLAYLISTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_PLAYLISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        playlists: [...state.playlists, ...action.playlists.items]
      };
    case FETCH_USER_PLAYLISTS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    case FETCH_PLAYLIST_TRACKS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_PLAYLIST_TRACKS_SUCCESS:
      console.log(action.tracks);
      return {
        ...state,
        playlists: state.playlists.map(playlist => {
          if (playlist.id === action.playlistId) {
            return { ...playlist, tracks: action.tracks };
          }
          return playlist;
        })
      };
    case FETCH_PLAYLIST_TRACKS_ERROR:
      return { ...state, error: action.error, loading: false };

    default:
      return state;
  }
}
