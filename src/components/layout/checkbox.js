import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import useFetch from '../../hooks/use-fetch';

const Checkbox = ({ id, isChecked }) => {
  const [,doFetch] = useFetch('tasks');
  const [isCheck, setIsCheck] = useState(isChecked); 

  const archiveTask = async (id) => {
    await doFetch({ _id: id }, 'PATCH');
    setIsCheck((prevState) => !prevState);
  };
  const isActive = isCheck && 'checkbox--active';

  return (
    <div 
      className="checkbox-holder" 
      data-testid="checkbox-action"

      onClick={() => archiveTask(id)}
    >
      <span className={`checkbox ${isActive}`}>
        {isCheck && <FaCheck />}
      </span>
    </div>
  );
};

export default Checkbox;