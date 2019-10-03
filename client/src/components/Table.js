import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import '../styles/Table.css';

function Table({
  tracks,
  setTrackPlayingState,

  currentTrack
}) {
  function renderTableData() {
    return (
      tracks &&
      tracks.map(({ album, name, artists, id }, index) => {
        const isPlayingStyles =
          currentTrack && currentTrack.name && currentTrack.name === name
            ? {
                color: 'rgb(55, 173, 128)'
              }
            : null;

        return (
          <tr
            className="tracks-data"
            key={name + index}
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
              ) : (
                index + 1
              )}
            </td>
            <td
              className="track-title"
              style={{ ...isPlayingStyles, minWidth: '30vw' }}
            >
              {name}
            </td>
            <td style={{ minWidth: '15vw' }}>{album.name.slice(0, 16)}...</td>
            <td style={{ minWidth: '15vw' }}>{artists[0].name}</td>
          </tr>
        );
      })
    );
  }

  return (
    <div className="tracks-table-container">
      <table className="tracks-table">
        <tbody>
          <tr>
            <th style={{ borderTopLeftRadius: '10px' }}></th>
            <th style={{ width: '25vw' }}>Title</th>
            <th style={{ width: '25vw' }}>Album</th>
            <th style={{ borderTopRightRadius: '10px', width: '25vw' }}>
              Artist
            </th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
