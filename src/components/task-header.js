import React, { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

import Spinner from './layout/spinner';
import ErrorModal from './layout/error-modal';
import useFetch from '../hooks/use-fetch';
import useProjects from '../hooks/use-projects';
import { types } from '../contexts/project-reducer';

const TaskHeader = ({ title, id }) => {
  const [{ response, isLoading, error }, doFetch] = useFetch('projects');
  const { dispatch } = useProjects();

  useEffect(() => {
    if (response) {
      dispatch({ 
        type: types.DELETE_PROJECT, 
        payload: response.projects.userProjects 
      });
    }
  }, [response, dispatch])
  
  const handleProjectDelete = (e) => {
    const options = {
      projectDeleteId: id
    }
    doFetch(options, 'DELETE');
  }

  return (
    <div className="tasks__header">
      
      {isLoading && <Spinner />}
      {error && !isLoading && <ErrorModal />}

      <h2 className="tasks__project-title">{title}</h2>
      <button className="tasks__project-delete" onClick={handleProjectDelete}>
        <FaTrash/>
      </button>
    </div>
  )
}

export default TaskHeader;