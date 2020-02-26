import React, { useContext } from 'react';
import { FaTrash } from 'react-icons/fa';

import Checkbox from './layout/checkbox';
import { userContext } from '../contexts/user-context';
import { types } from '../contexts/user-reducer';

const Task = ({ task, onDelete }) => {
  const { dispatch } = useContext(userContext);
  
  const handleClickTask = () => {
    dispatch({type: types.SET_CURRENT_TASK, payload: task})
  }

  return (
    <li className="task">
      <Checkbox id={task._id} />
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