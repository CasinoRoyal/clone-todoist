import React, { useEffect, useCallback } from 'react';

import Sidebar from './sidebar';
import TasksList from '../tasks-list';
import TaskDetails from '../task-details';
import useProjects from '../../hooks/use-projects';
import useTasks from '../../hooks/use-tasks';
import { types } from '../../contexts/tasks-reducer';

const Content = () => {
  const { state: tasksState, dispatch } = useTasks();
  const { state: projectsState } = useProjects();

  const handleKeyDown = useCallback((e) => {
    if (e.keyCode === 27 && tasksState.currentTask) {
      dispatch({ type: types.SET_CURRENT_TASK, payload: null });
    }
  }, [dispatch, tasksState])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [tasksState.currentTask, dispatch, handleKeyDown])

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