import React, { useContext } from 'react';

import { types } from '../contexts/user-reducer';
import { userContext } from '../contexts/user-context';

const ProjectsList = ({ projects }) => {
  const { dispatch } = useContext(userContext);

  const handleProjectClick = (e) => {
    const projectId = e.target.dataset.projectid;
    dispatch({ type: types.SET_PROJECT, payload: projectId });
  };

  return(
    <ul className="sidebar__projects">
      {
        projects.map((project) => {
          return(
            <li 
              key={project._id} 
              data-projectid={project._id} 
              onClick={handleProjectClick}
            >
              {project.title}
            </li>
          );
        })
      }
    </ul>
  )
};

export default ProjectsList;