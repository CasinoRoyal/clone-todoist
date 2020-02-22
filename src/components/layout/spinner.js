import React from 'react';

import preloader from './preloader.svg';
// import Modal from './modal';

const Spinner = () => {
  return(
    <div className="spinner">
      <img src={preloader} alt=""/>
    </div>

  );
};

export default Spinner;