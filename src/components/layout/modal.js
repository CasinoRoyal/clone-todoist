import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children }) => {
  const content = (
    <div className="modal">
      {children}
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal'));
};

export default Modal;