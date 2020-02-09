import React from 'react';

const ProjectsList = ({ projects }) => {
  console.log(projects)
  return(
    <ul className="sidebar__projects">
      {
        projects.map((project) => {
          return <li key={project._id}>{project.title}</li>
        })
      }
    </ul>
  )
};

export default ProjectsList;