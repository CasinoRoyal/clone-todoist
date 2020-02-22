import React, { Fragment, useState, useContext, useEffect } from 'react';
import { FaPlayCircle } from 'react-icons/fa';

import useFetch from '../hooks/use-fetch';
import { types } from '../contexts/user-reducer';
import { userContext }  from '../contexts/user-context';
import Task from './task';

const TasksList = ({ tasks }) => {
  const [task, setTask] = useState('');
  const { state, dispatch } = useContext(userContext);
  const [{response, isLoading}, doFetch] = useFetch('tasks');

  useEffect(() => {
    if (response && !isLoading) {
      dispatch({ type: types.ADD_TASK });
      setTask('');
    }
  }, [response, isLoading, dispatch]);

  const handleAddTask = () => {
    const options = {
      projectId: state.currentProject,
      task
    }
    doFetch(options, 'POST');
  };

  return(
    <Fragment>
      {!tasks.length && <h2 className="no-task">No tasks yet</h2>}
      <ul className='tasks__list'>
        {tasks.map(task => {
          return <Task key={task._id} task={task} />        
        })}
      </ul>

      <div className="tasks__control">
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
        />
        <button onClick={handleAddTask}><FaPlayCircle/></button>
      </div>
    </Fragment>
  );
};

export default TasksList;