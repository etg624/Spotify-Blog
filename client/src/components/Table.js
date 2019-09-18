import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import '../styles/Table.css';

function Table({ tracks, setTrackPlayingState, isPlaying, currentTrack }) {
  function renderTableData() {
    return (
      tracks &&
      tracks.map(({ album, name, artists, id }) => {
        const isPlayingStyles =
          currentTrack && currentTrack.name && currentTrack.name === name
            ? {
                color: 'rgb(55, 173, 128)'
              }
            : null;

        return (
          <tr
            className="tracks-data"
            key={name}
            onDoubleClick={() => {
              setTrackPlayingState(id);
            }}
          >
            <td>
              {currentTrack &&
              currentTrack.name &&
              currentTrack.name === name ? (
                <span>
                  <FontAwesomeIcon icon={faVolumeUp} style={isPlayingStyles} />
                </span>
              ) : null}
            </td>
            <td className="track-title" style={isPlayingStyles}>
              {name}
            </td>
            <td>{album.name.slice(0, 16)}...</td>
            <td>{artists[0].name}</td>
          </tr>
        );
      })
    );
  }

  return (
    <div className="tracks-table-container">
      <table className="tracks-table" style={{ overflowY: 'scroll' }}>
        <tbody>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Album</th>
            <th>Artist</th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
