import React, { useState, Fragment, useContext } from 'react';
import { FaChevronDown } from 'react-icons/fa';

import { types } from '../contexts/project-reducer';
import { appContext } from '../contexts/app-context';
import useProjects from '../hooks/use-projects';

const ProjectsList = () => {
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [isShowProject, setIsShowProject] = useState(true);
  const { setAppState } = useContext(appContext);
  const { state, dispatch } = useProjects();
  let appGenerateProjects = [];
  let userProjects = [];

  state.projects.forEach((p) => { 
    if (p.isBookmark) {
      appGenerateProjects.push(p);
    } else {
      userProjects.push(p);
    }
  });

  const handleProjectClick = (e) => {
    const projectId = e.currentTarget.dataset.projectid;
    setActiveProjectId(projectId);
    setAppState({ isShowSidebar: false });
    dispatch({ 
      type: types.SET_PROJECT, 
      payload: { projectId, title: e.currentTarget.textContent } 
    });
  };

  const setClassName = (currentId) => {
    return currentId === activeProjectId ? 
      'sidebar__project active' : 'sidebar__project' 
  }

  const handleShowProject = () => setIsShowProject((prevState) => !prevState);

  return(
    <Fragment>
      <ul className="sidebar__generic">
        {
          appGenerateProjects.map((project) => (
            <li 
              key={project._id} 
              data-projectid={project._id} 
              onClick={handleProjectClick}
              className={setClassName(project._id)}
            >
              <span>{project.title}</span>

            </li>
          ))
        }
      </ul>

      <div className="sidebar__middle">
        <div className="sidebar__topic" onClick={handleShowProject}>
          <h2>Projects</h2>
          <FaChevronDown
            className={!isShowProject ? 'hidden-projects' : undefined}
          />
        </div>

        {isShowProject &&
          <ul className="sidebar__projects">
            {
              userProjects.map((project) => {
                return(
                  <li 
                    key={project._id} 
                    data-projectid={project._id} 
                    onClick={handleProjectClick}
                    className={setClassName(project._id)}
                  >
                    <span>{project.title}</span>
                  </li>
                );
              })
            }
          </ul>
        }
      </div>


    </Fragment>
  )
};

export default ProjectsList;