import React, { useState, useContext, useEffect, Fragment } from 'react';
// import { 
//   FaChevronDown, 
//   FaInbox, 
//   FaRegCalendarAlt, 
//   FaRegCalendar 
// } from 'react-icons/fa';

import { userContext } from '../../contexts/user-context';
import { types } from '../../contexts/user-reducer';
import useFetch from '../../hooks/use-fetch';
import UserProjectsList from '../user-projects-list';
import Spinner from './spinner';

const Sidebar = () => {
  const [newTask, setNewTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const { dispatch } = useContext(userContext);
  
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
  }, [fetchAllProjects, newProjectResponse]);

  useEffect(() => {
    if (newProjectResponse) {
      setNewTask(false);
      setTaskTitle('');
      dispatch({ 
        type: types.ADD_PROJECT
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

  return(
    <aside className="sidebar" data-testid="sidebar">
        
      {allProjectsIsLoading && <Spinner />}

      {allProjectsResponse && <UserProjectsList projects={allProjectsResponse.projects} />}

      {newTask && (
        <Fragment>
          <input 
            type="text" 
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddProject}>
            {newProjectIsLoading ? 'Wait' : 'Add'}
          </button>
        </Fragment>
      )}
        
      <button onClick={() => setNewTask(!newTask)}>
        {newTask ? 'Cancel' : '+'}
      </button>
    </aside>
  );
};

export default Sidebar;