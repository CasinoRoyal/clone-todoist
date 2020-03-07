import React from 'react';
import { FaTrash } from 'react-icons/fa';

import Checkbox from './layout/checkbox';
import { types } from '../contexts/tasks-reducer';
import useTasks from '../hooks/use-tasks';

const Task = ({ task, onDelete }) => {
  const { dispatch } = useTasks();
  const handleClickTask = () => {
    dispatch({type: types.SET_CURRENT_TASK, payload: task})
  }

  return (
    <li className="task" data-taskid={task._id}>
      <Checkbox id={task._id} isChecked={task.isArchived} />
      <div className="task__container">
        <span className="task__content" onClick={handleClickTask}>
          {task.body}
        </span>

        <button className="task__btn" onClick={() => onDelete(task._id)}>
          <FaTrash />
        </button>    
      </div>
    </li>
  );
}

export default Task;