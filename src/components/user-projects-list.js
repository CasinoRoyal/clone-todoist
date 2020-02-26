import React, { useContext, Fragment } from 'react';

import { types } from '../contexts/user-reducer';
import { userContext } from '../contexts/user-context';

const UserProjectsList = ({ projects }) => {

  const { dispatch } = useContext(userContext);
  let appGenerateProjects = [];
  let userProjects = [];

  projects.forEach((p) => { 
    if (p.isBookmark) {
      appGenerateProjects.push(p);
    } else {
      userProjects.push(p);
    }
  });

  const handleProjectClick = (e) => {
    console.dir(e.currentTarget)
    const projectId = e.currentTarget.dataset.projectid;
    dispatch({ 
      type: types.SET_PROJECT, 
      payload: { projectId, title: e.currentTarget.textContent } 
    });
  };

  return(
    <Fragment>
      <ul className="sidebar__generic">
        {
          appGenerateProjects.map((project) => (
            <li 
              key={project._id} 
              data-projectid={project._id} 
              onClick={handleProjectClick}
              className="sidebar__project"
            >
              <span>{project.title}</span>
            </li>
          ))
        }
      </ul>

      <div className="sidebar__middle">
        <span>
          <h2>Projects</h2>
        </span>

        <ul className="sidebar__projects">
          {
            userProjects.map((project) => {
              return(
                <li 
                  key={project._id} 
                  data-projectid={project._id} 
                  onClick={handleProjectClick}
                  className="sidebar__project"
                >
                  {project.title}
                </li>
              );
            })
          }
        </ul>
      </div>


    </Fragment>
  )
};

export default UserProjectsList;