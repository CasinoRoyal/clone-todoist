import React, { Fragment, useState, useEffect, useCallback } from 'react';

import useFetch from '../../hooks/use-fetch';
import useProjects from '../../hooks/use-projects';
import useTasks from '../../hooks/use-tasks';
import { types } from '../../contexts/tasks-reducer';
import Spinner from '../layout/spinner'
import TaskHeader from '../task-header';
import TaskFooter from '../task-footer';
import TasksList from '../tasks-list';

const Main = () => {
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

  return(  
    <Fragment>      
      { (isLoadingAllTasks || tasksState.passTask) && <Spinner /> }

      <TaskHeader 
        title={projectsState.currentProject.title} 
        id={projectsState.currentProject.projectId}
        deleteble={projectsState.currentProject.deleteble}
      />

      <TasksList />

      <TaskFooter handleIsFetch={handleIsFetch} />
    </Fragment>
  );
};

export default Main;