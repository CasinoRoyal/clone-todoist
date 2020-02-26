import React from 'react';

const TaskHeader = ({ title }) => {
  return (
    <div className="tasks__header">
      <h2 className="tasks__title">{title}</h2>
    </div>
  )
}

export default TaskHeader;