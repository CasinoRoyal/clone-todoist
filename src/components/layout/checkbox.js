import React from 'react';

const Checkbox = () => {
  const archiveTask = () => {};

  return (
    <div 
      className="checkbox-holder" 
      data-testid="checkbox-action"
      onClick={() => archiveTask}
    >
    <span className="checkbox" />
    </div>
  );
};

export default Checkbox;