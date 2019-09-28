import React from 'react';
import '../styles/CurrentTrackPic.css';

function CurrentTrackPic({ imgSrc }) {
  return (
    <aside className="current-track-pic">
      <img src={imgSrc}></img>
    </aside>
  );
}

export default CurrentTrackPic;
