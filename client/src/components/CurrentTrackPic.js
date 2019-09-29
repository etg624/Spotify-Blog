import React from 'react';
import '../styles/CurrentTrackPic.css';

function CurrentTrackPic({ imgSrc, alt }) {
  return (
    <aside className="current-track-pic">
      <img src={imgSrc} alt={alt} />
    </aside>
  );
}

export default CurrentTrackPic;
