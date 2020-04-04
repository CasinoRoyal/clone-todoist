import React, { useState, useContext, useEffect, Fragment } from 'react';
// import { 
//   FaChevronDown, 
//   FaInbox, 
//   FaRegCalendarAlt, 
//   FaRegCalendar 
// } from 'react-icons/fa';

import { projectContext } from '../../contexts/project-context';
import { types } from '../../contexts/project-reducer';
import { appContext } from '../../contexts/app-context';
import useFetch from '../../hooks/use-fetch';
import ProjectsList from '../projects-list';
import Spinner from './spinner';
import UserPanel from './user-panel';

const Sidebar = () => {
  const [newTask, setNewTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const { dispatch } = useContext(projectContext);
  const { appState } = useContext(appContext);

  const [
    { 
      response: newProjectResponse, 
      isLoading: newProjectIsLoading 
    }, 
    fetchNewProject
  ] = useFetch('projects');

  const [
    { 
      response: allProjectsResponse, 
      isLoading: allProjectsIsLoading
    }, 
    fetchAllProjects
  ] = useFetch('projects');

  useEffect(() => {
    fetchAllProjects(null, 'GET');
  }, [fetchAllProjects, newProjectResponse, dispatch]);

  useEffect(() => {
    if (allProjectsResponse) {
      dispatch({ 
        type: types.GET_PROJECTS,
        payload: allProjectsResponse.projects
      });
    }
  }, [allProjectsResponse, dispatch])

  useEffect(() => {
    if (newProjectResponse) {
      setNewTask(false);
      setTaskTitle('');
      dispatch({ 
        type: types.GET_PROJECT, 
        payload: newProjectResponse.project.userProjects
      });
    }
  }, [newProjectResponse, setNewTask, dispatch])

  const handleAddProject = (e) => {
    if (!taskTitle.trim().length) {
      return console.info('Must contains at least one character')
    }
    
    const options = { title: taskTitle }
    fetchNewProject(options, 'POST');
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
     handleAddProject();
    }

    if (e.keyCode === 27) {
      setNewTask(false);
    }
  };

  const classNameSidebar = appState.isShowSidebar ? (
    'sidebar sidebar--show'
  ) : (
    'sidebar'
  );

  return(
    <aside className={classNameSidebar} data-testid="sidebar">
        
      {allProjectsIsLoading && <Spinner />}
      {newProjectIsLoading && <Spinner />}

      {allProjectsResponse && <ProjectsList />}

      <div className="control-panel"> 
        {newTask && (
          <Fragment>
            <input
              autoFocus
              type="text" 
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              className="control-panel__btn control-panel__btn--green"
              onClick={handleAddProject}
            >
              Add
            </button>
          </Fragment>
        )}
          
        <button 
          className="control-panel__btn control-panel__btn--red" 
          onClick={() => setNewTask(!newTask)}
        >
          {newTask ? 'Cancel' : '+'}
        </button>
      </div>
      {
        appState.isShowSidebar && <div className="user-panel"><UserPanel /></div>
      }
    </aside>
  );
};

export default Sidebar;