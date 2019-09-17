import React from 'react';
import '../styles/Table.css';

function Table({ data }) {
  function renderTableData() {
    console.log(data);
    return (
      data &&
      data.map(({ album, name, artists }) => (
        <tr className="tracks-data" key={name}>
          <td></td>
          <td>{name}</td>
          <td>{album.name.slice(0, 16)}...</td>
          <td>{artists[0].name}</td>
        </tr>
      ))
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
