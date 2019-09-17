import React, { Component } from 'react';
import { connect } from 'react-redux';

import Player from './Player';
import Loading from './Loading';
import { fetchPlaylistTracks } from '../actions/playlists/fetchPlaylistTracks';
import '../styles/Tracks.css';
class Tracks extends Component {
  componentDidMount() {
    const {
      dispatch,
      match: { params }
    } = this.props;
    dispatch(fetchPlaylistTracks(params.id));
  }

  render() {
    const {
      loading,

      currentPlaylist: { tracks, id }
    } = this.props;
    if (loading) {
      return <Loading />;
    }

    const tracksToRender =
      tracks &&
      tracks.map((track, index) => {
        console.log(track);
        return (
          <li className="track" key={track.id}>
            <section className="track-info">
              <span>{index + 1}</span>
              <div>
                {track.name}
                {track.album.name}
                {track.artists[0].name}
              </div>
            </section>
          </li>
        );
      });
    return (
      <main className="tracks-page">
        <section className="tracks-container">
          <ul className="tracks">{tracksToRender}</ul>
          <Player playlistId={id} />
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => {
  const { currentPlaylist, loading } = state.playlists;
  return {
    currentPlaylist,
    loading
  };
};
export default connect(mapStateToProps)(Tracks);
