import React, { Fragment, useState, useContext, useEffect } from 'react';

import useFetch from '../hooks/use-fetch';
import { types } from '../contexts/user-reducer';
import { userContext }  from '../contexts/user-context';
import Task from './task';
import TaskHeader from './task-header';

const TasksList = ({ tasks, title }) => {
  const [tasksList, setTasksList] = useState([]);
  const [task, setTask] = useState('');
  const { state, dispatch } = useContext(userContext);
  const [{response, isLoading}, doFetch] = useFetch('tasks');

  useEffect(() => {
    setTasksList(tasks);
  }, [tasks])

  useEffect(() => {
    if (response && !isLoading) {
      dispatch({ type: types.ADD_TASK });
      setTask('');
    }
  }, [response, isLoading, dispatch]);

  const handleAddTask = () => {
    const options = {
      projectId: state.currentProject.projectId,
      task
    }
    doFetch(options, 'POST');
  };

  const handleTaskDelete = (_id) => {
    const filtredList = tasksList.filter((task) => task._id !== _id);
    setTasksList(filtredList);
    doFetch({ _id }, 'DELETE');
  }

  return(
    <Fragment>
      <TaskHeader title={title} />

      <ul className='tasks__list'>
        {!tasks.length && <h2 className="no-task">No tasks yet</h2>}
        
        {tasksList.map(task => {
          return <Task key={task._id} task={task} onDelete={handleTaskDelete} />        
        })}
      </ul>

      <div className="tasks__footer">
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
        />
        <button onClick={handleAddTask}> >> </button>
      </div>
    </Fragment>
  );
};

export default TasksList;