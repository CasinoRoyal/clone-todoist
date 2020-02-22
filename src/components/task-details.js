import React, { useState, useContext, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

import { types } from '../contexts/user-reducer';
import { userContext } from '../contexts/user-context';
import useFetch from '../hooks/use-fetch';

const TaskDetails = ({ task }) => {
  console.log(task)
  const { dispatch } = useContext(userContext);
  const [taskBody, setTaskBody] = useState(task.body);
  const [cacheTaskBody, setCacheTaskBody] = useState(task.body);
  const [isEdit, setIsEdit] = useState(false);
  const [, doFetch] = useFetch('tasks');

  useEffect(() => {
    setTaskBody(task.body);
    setCacheTaskBody(task.body);
  }, [task.body])

  useEffect(() => {
    if (isEdit) {
      doFetch({taskBody, '_id': task._id}, 'PUT');
      setCacheTaskBody(taskBody);
      setIsEdit((prevState) => !prevState);
      dispatch({type: types.TOGGLE_EDIT_TASK});
    }
  }, [isEdit, doFetch, task, taskBody])

  const handleClose = () => {
    dispatch({ type: types.SET_CURRENT_TASK, payload: null })
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && (taskBody !== cacheTaskBody)) {
      setIsEdit((prevState) => !prevState);
    }

    if (e.keyCode === 27 && (taskBody !== cacheTaskBody)) {
      setTaskBody(cacheTaskBody);
    }
  };

  return(
    <aside className="details">
      <div className="details__group">
        <textarea 
          className="details__task"
          cols="30" 
          rows="5" 
          value={taskBody} 
          onChange={(e) => setTaskBody(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e) }
        />

      </div>

      <footer className="details__footer">
        <button className="details__close" onClick={handleClose}>
          <FaTimes/>
        </button>
        <span>{task.createdAt}</span>
      </footer>
    </aside>
  )
}

export default TaskDetails;