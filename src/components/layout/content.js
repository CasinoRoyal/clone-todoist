import React, { useEffect } from 'react';

import Sidebar from './sidebar';
import TasksList from '../tasks-list';
import TaskDetails from '../task-details';
import useFetch from '../../hooks/use-fetch';
import useProjects from '../../hooks/use-projects';
import useTasks from '../../hooks/use-tasks';
import { types } from '../../contexts/tasks-reducer';

const Content = () => {
  const { state: tasksState, dispatch } = useTasks();
  const { state: projectsState } = useProjects();
  // const url = projectsState.currentProject && projectsState.currentProject.projectId; 
  // const [{response, isLoading}, doFetch] = useFetch(`tasks/${url}`);

  const handleKeyDown = (e) => {
    if (e.keyCode === 27 && tasksState.currentTask) {
      dispatch({ type: types.SET_CURRENT_TASK, payload: null });
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [tasksState.currentTask, dispatch])

  // useEffect(() => {
  //   if (projectsState && projectsState.currentProject) {
  //     doFetch(null, 'GET');
  //   }

  //   // if (tasksState.passTask) {
  //   //   dispatch({ type: types.PASS_TASK, payload: false })
  //   // }
  // }, [projectsState, doFetch, tasksState.isEditTask]);

  // useEffect(() => {
  //   if (response && response.tasks) {
  //     dispatch({ type: types.GET_TASKS, payload: response.tasks })
  //   }
  // }, [dispatch, response.tasks, response]);

  return(
    <section className='content'>
      <Sidebar />

      <div className="tasks">
        {
          projectsState.currentProject && 
          projectsState.currentProject.projectId &&
          <TasksList />
        }
      </div>

      {tasksState.currentTask && <TaskDetails />}
    </section>
  );
};

export default Content;