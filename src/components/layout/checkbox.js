import React, { useState } from 'react';

import useFetch from '../../hooks/use-fetch';

const Checkbox = ({ id, isChecked, icon, type }) => {
  const [,doFetch] = useFetch('tasks');
  const [isCheck, setIsCheck] = useState(isChecked); 

  const setFeature = async (id) => {
    const options = { _id: id, typeFeature: type };

    await doFetch(options, 'PATCH');
    setIsCheck((prevState) => !prevState);
  };
  const isActive = isCheck && 'checkbox--active';

  return (
    <div 
      className="checkbox-holder" 
      data-testid="checkbox-action"

      onClick={() => setFeature(id)}
    >
      <span className={`checkbox ${isActive}`}>
        {isCheck && icon}
      </span>
    </div>
  );
};

export default Checkbox;