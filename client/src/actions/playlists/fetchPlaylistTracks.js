import decodeJWT from 'jwt-decode';
export const FETCH_PLAYLIST_TRACKS_REQUEST = 'FETCH_PLAYLIST_TRACKS_REQUEST';
export const fetchPlayListTracksRequest = () => ({
  type: FETCH_PLAYLIST_TRACKS_REQUEST
});

export const FETCH_PLAYLIST_TRACKS_SUCCESS = 'FETCH_PLAYLIST_TRACKS_SUCCESS';
export const fetchPlayListTracksSuccess = (tracks, playlistId) => ({
  type: FETCH_PLAYLIST_TRACKS_SUCCESS,
  tracks,
  playlistId
});

export const FETCH_PLAYLIST_TRACKS_ERROR = 'FETCH_PLAYLIST_TRACKS_ERROR';
export const fetchPlayListTracksError = error => ({
  type: FETCH_PLAYLIST_TRACKS_ERROR,
  error
});

export const fetchPlaylistTracks = playlistId => (dispatch, getState) => {
  const { authToken } = getState().auth;
  const { accessToken } = decodeJWT(authToken).user;

  dispatch(fetchPlayListTracksRequest());
  return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
    .then(res => res.json())
    .then(tracks => {
      return dispatch(
        fetchPlayListTracksSuccess(
          tracks.items.map(({ track }) => track),
          playlistId
        )
      );
    })
    .catch(err => {
      console.log(err);
      dispatch(fetchPlayListTracksError(err));
    });
};
