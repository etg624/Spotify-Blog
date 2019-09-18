import React from 'react';
import '../styles/Table.css';

function Table({ tracks, setTrackPlayingState, isPlaying, currentTrack }) {
  console.log(currentTrack);
  function renderTableData() {
    return (
      tracks &&
      tracks.map(({ album, name, artists, id }) => {
        const isPlayingStyles = {
          backgroundColor:
            currentTrack && currentTrack.name && currentTrack.name === name
              ? 'rgba(143, 0, 79, 0.7)'
              : ''
        };

        return (
          <tr
            style={isPlayingStyles}
            className="tracks-data"
            key={name}
            onDoubleClick={() => {
              console.log(id);
              setTrackPlayingState(id);
            }}
          >
            <td></td>
            <td className="track-title">{name}</td>
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
