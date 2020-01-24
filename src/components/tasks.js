import React from 'react';

import Checkbox from './layout/checkbox';

const Tasks = () => {
  const tasks = [];
  const projectName = '';

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>

      <ul className="tasks__list">
        {tasks.map(task => (
          <li key={task_.id}>
            <Checkbox id={task._id} />
            <span>{task.body}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;