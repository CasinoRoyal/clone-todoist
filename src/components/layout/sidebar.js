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
  const { state, dispatch } = useContext(userContext);
  const [newTask, setNewTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [{ response, isLoading }, doFetch] = useFetch('projects');
  const userProjects = state.projects.filter((p) => p.isBookmark === false );

  useEffect(() => {
    if (response) {
      setNewTask(false);
      setTaskTitle('');
      dispatch({ 
        type: types.ADD_PROJECT, 
        payload: response.project.userProjects 
      });
    }
  }, [response, setNewTask, dispatch])

  const handleAddProject = (e) => {
    if (!taskTitle.trim().length) {
      return console.info('Must contains at least one character')
    }
    
    const options = {
      title: taskTitle
    }
    doFetch(options, 'POST');
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
        <ProjectsList projects={userProjects} />

        {newTask && (
          <Fragment>
            <input 
              type="text" 
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleAddProject}>
              {isLoading ? 'Wait' : 'Add'}
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