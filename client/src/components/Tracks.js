import React, { Component } from 'react';
import { connect } from 'react-redux';

import Player from './Player';
import Loading from './Loading';
import { fetchPlaylistTracks } from '../actions/playlists/fetchPlaylistTracks';
import Table from './Table';

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
    return (
      <main className="tracks-page">
        <section className="tracks-container">
          <Table data={tracks} />
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
