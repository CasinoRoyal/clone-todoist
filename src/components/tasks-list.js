import React, { Fragment, useContext, useState, useEffect } from 'react';

import useFetch from '../hooks/use-fetch';
import { types } from '../contexts/user-reducer';
import { userContext }  from '../contexts/user-context';
import Task from './task';

const TasksList = ({ tasks }) => {
  const [task, setTask] = useState('');
  const { state, dispatch } = useContext(userContext);
  const [{response, isLoading}, doFetch] = useFetch('tasks');
  let tasksListContent;

  useEffect(() => {
    if (response && !isLoading) {
      dispatch({ type: types.ADD_TASK });
      setTask('');
    }
  }, [response, isLoading]);

  if (!tasks.length) {
    tasksListContent = <h2 className="no-task">No tasks yet</h2>;
  } else {
    tasksListContent = (
      <ul className='tasks__list'>
        {tasks.map(task => {
          return <Task key={task._id} task={task} />        
        })}
        
      </ul>
    );
  }

  const handleAddTask = () => {
    const options = {
      projectId: state.currentProject,
      task
    }
    doFetch(options, 'POST');
  };

  return(
    <Fragment>
      {tasksListContent}
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={handleAddTask}>Add task</button>
    </Fragment>
  );
};

export default TasksList;