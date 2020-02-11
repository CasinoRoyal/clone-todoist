import React, { Fragment, useContext, useState, useEffect } from 'react';

import useFetch from '../hooks/use-fetch';
import { types } from '../contexts/user-reducer';
import { userContext }  from '../contexts/user-context';

const TasksList = ({ tasks }) => {
  const [task, setTask] = useState('');
  const { state, dispatch } = useContext(userContext);
  const [{response, isLoading}, doFetch] = useFetch('tasks');

  useEffect(() => {
    if (response && !isLoading) {
      dispatch({ type: types.ADD_TASK });
      setTask('');
    }
  }, [response, isLoading]);

  const handleAddTask = () => {
    const options = {
      projectId: state.currentProject,
      task
    }
    doFetch(options, 'POST');
  };

  const tasksRenderer = !tasks.length ? <li>'No tasks yet'</li> : (
    tasks.map((task) => <li key={task._id}>{task.body}</li> )
  );

  return(
    <Fragment>
      <ul className='tasks__list'>
        {tasksRenderer}        
      </ul>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={handleAddTask}>Add task</button>
    </Fragment>
  );
};

export default TasksList;