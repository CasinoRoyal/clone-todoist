import React, { Fragment, useState, useEffect } from 'react';

import useFetch from '../hooks/use-fetch';
import useProjects from '../hooks/use-projects';
import useTasks from '../hooks/use-tasks';
import { types } from '../contexts/tasks-reducer';
import Task from './task';
import TaskHeader from './task-header';
import WithCustomMenu from '../hoc/with-custom-menu';
import Spinner from './layout/spinner'

const TasksList = () => {
  const [task, setTask] = useState('');
  const { state: tasksState, dispatch } = useTasks();
  const { state: projectsState } = useProjects();
  const url = projectsState.currentProject.projectId;
  const [
    { response: responseAddTask, isLoading: isLoadingAddTask }, 
    fetchTask
  ] = useFetch('tasks');
  
  const [
    { response: responseAllTasks, isLoading: isLoadingAllTasks }, 
    fetchAllTasks
  ] = useFetch(`tasks/${url}`);

  useEffect(() => {
    if (tasksState.passTask) {
      dispatch({ type: types.PASS_TASK, payload: false })
    }
  }, [tasksState.passTask, dispatch])

  useEffect(() => {
    fetchAllTasks(null, 'GET');
  }, [fetchAllTasks, tasksState.passTask, projectsState.currentProject]);

  useEffect(() => {
    if (responseAllTasks) {
      dispatch({ type: types.GET_TASKS, payload: responseAllTasks.tasks })
    }
  }, [responseAllTasks, dispatch])

  useEffect(() => {
    if (responseAddTask && !isLoadingAddTask) {
      dispatch({ type: types.ADD_TASK });
      setTask('');
    }
  }, [responseAddTask, isLoadingAddTask, dispatch]);

  const handleAddTask = () => {
    const options = {
      projectId: projectsState.currentProject.projectId,
      task
    }

    fetchTask(options, 'POST');
  };

  const handleTaskDelete = (_id) => {
    dispatch({ type: types.DELETE_TASK });
    fetchTask({ _id }, 'DELETE');
  }

  const listOfProjects = projectsState.projects.map((project) => {
    return { name: project.title, _id: project._id }
  });

  if (isLoadingAllTasks || tasksState.passTask) {
    return <Spinner />
  }
  return(  
    <Fragment>
      <TaskHeader title={projectsState.currentProject.title} />

      <WithCustomMenu listOfProjects={listOfProjects}>
        <ul className='tasks__list'>
            {!tasksState.tasks.length && <h2 className="no-task">No tasks yet</h2>}
            
            {tasksState.tasks.map(task => {
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