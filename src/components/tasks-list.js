import React, { Fragment, useState, useEffect, useCallback } from 'react';

import useFetch from '../hooks/use-fetch';
import useProjects from '../hooks/use-projects';
import useTasks from '../hooks/use-tasks';
import { types } from '../contexts/tasks-reducer';
import WithCustomMenu from '../hoc/with-custom-menu';
import transformList from '../utils/transform-list';
import Spinner from './layout/spinner'
import Task from './task';
import TaskHeader from './task-header';
import TaskFooter from './task-footer';

const TasksList = () => {
  const [isFetch, setIsFetch] = useState(true);
  const { state: tasksState, dispatch } = useTasks();
  const { state: projectsState } = useProjects();
  const url = projectsState.currentProject.projectId;
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

  const handleIsFetch = useCallback((value) => {
    setIsFetch(value);
  }, []);

  const listOfProjects = transformList(projectsState.projects);

  return(  
    <Fragment>      
      { (isLoadingAllTasks || tasksState.passTask) && <Spinner /> }

      <TaskHeader 
        title={projectsState.currentProject.title} 
        id={projectsState.currentProject.projectId}
        deleteble={projectsState.currentProject.deleteble}
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
              return <Task key={task._id} task={task} />        
            })}
        </ul>
      </WithCustomMenu>

      <TaskFooter handleIsFetch={handleIsFetch} />
    </Fragment>
  );
};

export default TasksList;