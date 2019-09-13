import React, { Component } from 'react';
import { startPlaylist } from '../actions/playlists/soundActions';
import { connect } from 'react-redux';
function Player(props) {
  const { playlistId, dispatch } = props;
  return (
    <button onClick={() => dispatch(startPlaylist(playlistId))}>PLAY</button>
  );
}

export default connect()(Player);
