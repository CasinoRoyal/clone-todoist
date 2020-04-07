import React, { useEffect, useCallback } from 'react';

import Sidebar from './sidebar';
import Main from './main';
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
          !projectsState.currentProject && (
            <div className="tasks__background">
              <p>Create new list and move to your dream</p>
            </div>
          )
        }

        {
          projectsState.currentProject && 
          projectsState.currentProject.projectId &&
          <Main />
        }
      </div>

      {tasksState.currentTask && <TaskDetails />}
    </section>
  );
};

export default Content;