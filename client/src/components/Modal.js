import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return ReactDOM.createPortal(
    <div className="modals active">
      <div className="modal visible active">MODALLLLLLLL</div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
