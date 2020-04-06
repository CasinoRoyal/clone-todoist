import React, { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

import useFetch from '../hooks/use-fetch';
import useProjects from '../hooks/use-projects';
import { types } from '../contexts/tasks-reducer';
import useTasks from '../hooks/use-tasks';

const TaskFooter = ({ handleIsFetch }) => {
  const [task, setTask] = useState('');
  const { dispatch } = useTasks();
  const { state: projectsState } = useProjects();  
  const [
    { response: responseAddTask, isLoading: isLoadingAddTask }, 
    fetchTask
  ] = useFetch('tasks');

  useEffect(() => {
    if (responseAddTask && !isLoadingAddTask) {
      dispatch({ type: types.ADD_TASK });
      setTask('');
      handleIsFetch(true);
    }
  }, [responseAddTask, isLoadingAddTask, dispatch, handleIsFetch]);

  const handleAddTask = () => {
    const options = {
      projectId: projectsState.currentProject.projectId,
      task
    }

    fetchTask(options, 'POST');
  };

  return(
    <div className="tasks__footer">
      <label>
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add task"
        />
        <button disabled={!task} className="tasks__btn" onClick={handleAddTask}>
          <FaPaperPlane />
        </button>
      </label>
    </div>
  );
}

export default TaskFooter;