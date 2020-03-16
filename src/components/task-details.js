import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import moment from 'moment';

import { types } from '../contexts/tasks-reducer';
import useFetch from '../hooks/use-fetch';
import useTasks from '../hooks/use-tasks';

const TaskDetails = () => {
  const { state, dispatch } = useTasks();
  const [taskBody, setTaskBody] = useState(state.currentTask.body);
  const [cacheTaskBody, setCacheTaskBody] = useState(state.currentTask.body);
  const [isEdit, setIsEdit] = useState(false);
  const [, doFetch] = useFetch('tasks');
  const taskDateCreation = moment(state.currentTask.createdAt).format('DD-MM-YY');

  useEffect(() => {
    setTaskBody(state.currentTask.body);
    setCacheTaskBody(state.currentTask.body);
  }, [state.currentTask.body])

  useEffect(() => {
    if (isEdit) {
      doFetch({taskBody, '_id': state.currentTask._id}, 'PUT');
      setCacheTaskBody(taskBody);
      setIsEdit((prevState) => !prevState);
      dispatch({type: types.TOGGLE_EDIT_TASK});
    }
  }, [isEdit, doFetch, taskBody, state.currentTask._id, dispatch])

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

  const handleTaskUpdate = () => {
    if (taskBody !== cacheTaskBody) {
      setIsEdit((prevState) => !prevState);
    }
  }

  const handleTaskCancelUpdate = () => {
    if (taskBody !== cacheTaskBody) {
      setTaskBody(cacheTaskBody);
    }
  }

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
        <button 
          className="details__btn details__btn--update" 
          onClick={handleTaskUpdate}
         >
          Update
        </button>
        <button 
          className="details__btn details__btn--cancel-update" 
          onClick={handleTaskCancelUpdate}
         >
          Cancel
        </button>
      </div>

      <footer className="details__footer">
        <button className="details__close" onClick={handleClose}>
          <FaTimes/>
        </button>
        <span>{`Created at: ${taskDateCreation}`}</span>
      </footer>
    </aside>
  )
}

export default TaskDetails;