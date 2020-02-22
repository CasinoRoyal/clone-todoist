import React from 'react';
import axios from 'axios';

import useFetch from '../../hooks/use-fetch';

const Checkbox = ({ id }) => {
  const [{ response }, doFetch] = useFetch('tasks');

  const archiveTask = async (id) => {
    await doFetch({ _id: id }, 'PATCH')
  };
  const isArchived = response && response.task.isArchived && 'checkbox--active';

  return (
    <div 
      className="checkbox-holder" 
      data-testid="checkbox-action"
      onClick={() => archiveTask(id)}
    >
      <span className={`checkbox ${isArchived}`} />
    </div>
  );
};

export default Checkbox;