import React from 'react';

const Modal = ({ children }) => {
  const content = (
    <div className="modal">
      {children}
    </div>
  );
  return content;
};

export default Modal;