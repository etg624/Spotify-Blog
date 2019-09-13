import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { fetchPlaylistTracks } from '../actions/playlists/fetchPlaylistTracks';
import requiresLogin from './HOC/requiresLogin';

function Playlist(props) {
  const { name, image, id, dispatch } = props;

  return (
    <Link to={`/playlist/tracks/${id}`}>
      <header className="playlist-item-name">
        <h2>{name.length <= 30 ? name : `${name.slice(0, 30)}...`}</h2>
      </header>

      <section className="playlist-item-img-container">
        <img
          className="playlist-item-img"
          src={image}
          alt={`Album art for ${name} playlist`}
        />
      </section>
    </Link>
  );
}

export default connect()(Playlist);
