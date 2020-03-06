import React, { useEffect } from 'react';

import Sidebar from './sidebar';
import TasksList from '../tasks-list';
import TaskDetails from '../task-details';
import useFetch from '../../hooks/use-fetch';
import useProjects from '../../hooks/use-projects';
import useTasks from '../../hooks/use-tasks';
import { types } from '../../contexts/tasks-reducer';
import WithCustomMenu from '../../hoc/with-custom-menu';

const Content = () => {
  const { state: tasksState, dispatch } = useTasks();
  const { state: projectsState } = useProjects();
  const url = projectsState.currentProject && projectsState.currentProject.projectId; 
  const [{response, isLoading}, doFetch] = useFetch(`tasks/${url}`);
  const listOfProjects = projectsState && projectsState.projects.map((project) => {
    return { name: project.title, _id: project._id }
  });

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && tasksState.currentTask) {
        dispatch({ type: types.SET_CURRENT_TASK, payload: null });
      }
    })
  }, [tasksState.currentTask, dispatch])

  useEffect(() => {
    if (projectsState && projectsState.currentProject) {
      doFetch(null, 'GET');
    }
  }, [projectsState, doFetch, tasksState.isEditTask]);

  return(
    <section className='content'>
      <Sidebar />

      <WithCustomMenu listOfProjects={listOfProjects}>
        <div className="tasks">
          {response && 
            <TasksList tasks={response.tasks} />
          }
        </div>
      </WithCustomMenu>

      {tasksState.currentTask && <TaskDetails />}
    </section>
  );
};

export default Content;