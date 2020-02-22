import React, { useState, useEffect, useRef, Fragment } from 'react';
import { FaEdit, FaTrash, FaBan } from 'react-icons/fa';

import Checkbox from './layout/checkbox';
import useFetch from '../hooks/use-fetch';

const Task = ({ task }) => {
  const taskRef = useRef(null);
  const [edit, setEdit] = useState(false);
  const [taskBody, setTaskBody] = useState(task.body);
  const [cacheTaskBody, setCacheTaskBody] = useState(task.body);
  const [, doFetch] = useFetch('tasks');
  let taskBodyContent;

  useEffect(() => {
    if (taskBody === cacheTaskBody) return;
    
    doFetch({taskBody, _id: task._id}, 'PUT');
    setCacheTaskBody(taskBody);
  }, [cacheTaskBody, taskBody])

  const handleEditTask = () => {
    if (edit) {
      setTaskBody(cacheTaskBody);
      setEdit((prevState) => !prevState);
      taskRef.current.blur();
    } else {
      setEdit((prevState) => !prevState);
      taskRef.current.focus();
    }
  }

  const handleDeleteTask = () => {
    console.info('delete!')
  }

  const handleKeyDown = (e) => {
    if (e.keyCode == 27) {
      handleEditTask();
    }

    if (e.keyCode == 13) {
      // setEdit((prevState) => !prevState);
      // setTaskBody(e.target.value);
    }
  }

  return (
    <li className="task">
      <Checkbox id={task._id} />
      <div className="task__container">
        <textarea
          wrap='soft'
          ref={taskRef}
          className="task__content"
          type="text"
          defaultValue={taskBody}
          onKeyDown={(e) => handleKeyDown(e)}
        />

        <button className="task__btn task__btn--edit" onClick={handleEditTask}>
          {!edit && <FaEdit />}
          {edit && <FaBan />}
        </button>

        <button className="task__btn" onClick={handleDeleteTask}>
          <FaTrash />
        </button>          
      </div>
    </li>
  );
}

export default Task;