import React, { Fragment, useState, useEffect } from 'react';

import useFetch from '../hooks/use-fetch';
import useProjects from '../hooks/use-projects';
import useTasks from '../hooks/use-tasks';
import { types } from '../contexts/tasks-reducer';
import Task from './task';
import TaskHeader from './task-header';
import WithCustomMenu from '../hoc/with-custom-menu';

const TasksList = ({ tasks }) => {
  const [tasksList, setTasksList] = useState([]);
  const [task, setTask] = useState('');
  const { state: tasksState, dispatch } = useTasks();
  const { state } = useProjects();
  const [{response, isLoading}, doFetch] = useFetch('tasks');
  const listOfProjects = state && state.projects.map((project) => {
    return { name: project.title, _id: project._id }
  });

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
      <TaskHeader title={state.currentProject.title} />

      <WithCustomMenu listOfProjects={listOfProjects}>
        <ul className='tasks__list'>
            {!tasks.length && <h2 className="no-task">No tasks yet</h2>}
            
            {tasksList.map(task => {
              return <Task key={task._id} task={task} onDelete={handleTaskDelete} />        
            })}
        </ul>
      </WithCustomMenu>

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