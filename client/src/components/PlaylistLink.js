import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function PlaylistLink({ name, image, playlistId }) {
  return (
    <div className="playlist-link">
      <header className="playlist-item-name">
        <h2>{name.length <= 30 ? name : `${name.slice(0, 30)}...`}</h2>
      </header>

      <section className="playlist-item-img-container">
        <Link to={`/playlist/${playlistId}`}>
          <img
            className="playlist-item-img"
            src={image}
            alt={`Album art for ${name} playlist`}
          />
        </Link>
      </section>
    </div>
  );
}

export default connect()(PlaylistLink);
