import React from 'react';

import preloader from './preloader.svg';
import ModalOverlay from './modal-overlay';

const Spinner = () => {
  return(
    <ModalOverlay>
      <div className="spinner">
        <img src={preloader} alt=""/>
      </div>
    </ModalOverlay>
  );
};

export default Spinner;