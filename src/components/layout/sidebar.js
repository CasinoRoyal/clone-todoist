import React, { useContext, useState, useEffect, Fragment } from 'react';
import { 
  FaChevronDown, 
  FaInbox, 
  FaRegCalendarAlt, 
  FaRegCalendar 
} from 'react-icons/fa';

import { userContext } from '../../contexts/user-context';
import { types } from '../../contexts/user-reducer';
import useFetch from '../../hooks/use-fetch';
import ProjectsList from '../projects-list';

const Sidebar = () => {
  const { dispatch } = useContext(userContext);
  const [newTask, setNewTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
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

  const userProjects = allProjectsResponse && (
    allProjectsResponse.projects.filter((p) => { 
      return p.isBookmark === false;
    })
  );

  const handleAddProject = (e) => {
    if (!taskTitle.trim().length) {
      return console.info('Must contains at least one character')
    }
    
    const options = {
      title: taskTitle
    }

    fetchNewProject(options, 'POST');
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
     handleAddProject();
    };
    if (e.keyCode === 27) {
      setNewTask(false);
    };
  };

  return(
    <aside className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li className="inbox" data-testid="inbox">
          <span><FaInbox />&nbsp;</span>
          <span>Inbox</span>
        </li>

        <li className="today" data-testid="today">
          <span><FaRegCalendar />&nbsp;</span>
          <span>Today</span>
        </li>
        
        <li className="next_7" data-testid="next_7">
          <span><FaRegCalendarAlt />&nbsp;</span>
          <span>Next 7 days</span>
        </li>
      </ul>
      <div className="sidebar__middle">
        <span>
          <FaChevronDown />
          <h2>Projects</h2>
        </span>
        
        {allProjectsIsLoading && <h2>LOADING...</h2>}

        {allProjectsResponse && <ProjectsList projects={userProjects} />}

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
      </div>
    </aside>
  );
};

export default Sidebar;