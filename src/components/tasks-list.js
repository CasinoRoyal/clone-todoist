import React, { Fragment, useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

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
  const [isFetch, setIsFetch] = useState(true);
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
    setIsFetch(false);
  }, [
    fetchAllTasks, 
    isFetch, 
    tasksState.passTask, 
    tasksState.isEditTask, 
    projectsState.currentProject
  ]);

  useEffect(() => {
    if (responseAllTasks) {
      dispatch({ type: types.GET_TASKS, payload: responseAllTasks.tasks })
    }
  }, [responseAllTasks, dispatch])

  useEffect(() => {
    if (responseAddTask && !isLoadingAddTask) {
      dispatch({ type: types.ADD_TASK });
      setTask('');
      setIsFetch(true);
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
    setIsFetch(true);
  }

  const listOfProjects = projectsState.projects.map((project) => {
    return { name: project.title, _id: project._id }
  });

  return(  
    <Fragment>
      
      { (isLoadingAllTasks || tasksState.passTask) && <Spinner /> }

      <TaskHeader 
        title={projectsState.currentProject.title} 
        id={projectsState.currentProject.projectId}
      />

      <WithCustomMenu listOfProjects={listOfProjects}>
        <ul className='tasks__list'>
            {!tasksState.tasks.length && (
              <h2 className="no-task">
                Oh, no! Empty list
                <span role="img" aria-label="upset">😦😦</span>
              </h2>
            )}
            
            {tasksState.tasks.map(task => {
              return <Task key={task._id} task={task} onDelete={handleTaskDelete} />        
            })}
        </ul>
      </WithCustomMenu>

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
    </Fragment>
  );
};

export default TasksList;