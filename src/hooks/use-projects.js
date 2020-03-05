import { useContext } from 'react';

import { projectContext } from '../contexts/project-context';

const useProjects = () => {
  return useContext(projectContext);
};

export default useProjects;