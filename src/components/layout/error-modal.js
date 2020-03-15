import React from 'react';

import ModalOverlay from './modal-overlay';

const ErrorModal = ({ errorMsg, onClose }) => {
  return(
    <ModalOverlay handleModalClose={onClose}>
      <div className="error-modal">
        <div className="error-modal__header">Error</div>
        <p className="error-modal__message">{errorMsg}</p>
        <button className="error-modal__button" onClick={onClose}>
          Ok
        </button>
      </div>
    </ModalOverlay>
  )
}

export default ErrorModal;