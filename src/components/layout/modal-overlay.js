import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

const ModalOverlay = ({ children, handleModalClose = ()=>{} }) => {
  const handleKeyUp = useCallback((e) => {
    if(e.keyCode === 13 || e.keyCode === 27) {
      handleModalClose();
    }
  }, [handleModalClose]);

  const handleModalOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      handleModalClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);

    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  const content = (
    <div className="modal-overlay" onClick={handleModalOverlayClick}>
      {children}
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal'));
};

export default ModalOverlay;