import React, { useEffect } from 'react';

import useFetch from '../../hooks/use-fetch';
import renderList from '../../utils/render-list';
import useTasks from '../../hooks/use-tasks';
import { types } from '../../contexts/tasks-reducer';

const ContextMenuItem = ({itemName, handleClick, id, children}) => (
  <li className="ctx-menu__item" onClick={handleClick} data-id={id || null}>
    {itemName}
    {children}
  </li>
);

const ContextMenu = ({ listOfProjects, apiUrl, taskId, onContextMenuClose }) => {
  const [{response, isLoading}, doFetch] = useFetch('tasks/moveTask');
  const { dispatch } = useTasks();
  const list = [
    {name: 'Mark as completed'},
    {name: 'Move to...', nestedList: [...listOfProjects]}, 
    {name: 'Delete task'}
  ];
  
  useEffect(() => {
    if (response && !isLoading) {
      onContextMenuClose();
      dispatch({ type: types.PASS_TASK, payload: true });
    }
  }, [response, isLoading, dispatch, onContextMenuClose]);

  const handleContextItemClick = (e) => {
    const projectId = e.target.dataset.id;
    const options = {
      projectId,
      taskId
    }
    doFetch(options, 'POST');
  };

  return(
    renderList(list, ContextMenuItem, handleContextItemClick)
  );
}

export default ContextMenu;