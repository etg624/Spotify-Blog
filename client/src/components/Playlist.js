import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUserPlaylists } from '../actions/playlists/fetchPlaylists';
import requiresLogin from './HOC/requiresLogin';

function Playlist(props) {
  const { name, image, id } = props;
  return (
    <div>
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
    </div>
  );
}

export default Playlist;
