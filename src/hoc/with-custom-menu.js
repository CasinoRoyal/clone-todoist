import React, { useEffect, useRef, useState, useCallback } from 'react';

import { renderList } from '../utils/render-list';
import useFetch from '../hooks/use-fetch';
import useTasks from '../hooks/use-tasks';
import { types } from '../contexts/tasks-reducer';
// import Spinner from '../components/layout/spinner';

const ContextMenuItem = ({itemName, handleClick, id, children}) => (
  <li className="ctx-menu__item" onClick={handleClick} data-id={id || null}>
    {itemName}
    {children}
  </li>
);

const WithContextMenu = ({ listOfProjects = [], children }) => {
  const [show, setShow] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [{response, isLoading}, doFetch] = useFetch('tasks/moveTask');
  const { dispatch } = useTasks();
  const ctx = useRef();
  const list = [
    {name: 'Mark as completed'},
    {name: 'Move to...', nestedList: [...listOfProjects]}, 
    {name: 'Delete task'}
  ];

  const onContextMenu = useCallback((e) => {
    e.preventDefault();
    if (listOfProjects.length <= 0) {
      return;
    }
    const li = e.target.closest('li');

    if (li) {
      setTaskId(li.dataset.taskid);
    } else {
      return;
    }

    setShow(true);
    const left = e.pageX;
    const top = e.pageY;

    ctx.current.firstElementChild.style.left = left + 'px';
    ctx.current.firstElementChild.style.top = top + 'px';
  }, [listOfProjects])

  const onContextMenuClose = useCallback((e) => {
    if (show) {
      setShow(false);
    }
  }, [show])

  useEffect(() => {
    if (response && !isLoading) {
      dispatch({ type: types.PASS_TASK, payload: true });
    }
  }, [response, isLoading, dispatch]);

  useEffect(() => {
    ctx.current.addEventListener('contextmenu', onContextMenu);

    return () => ctx.current.removeEventListener('contextmenu', onContextMenu);
  }, [listOfProjects, onContextMenu]);

  useEffect(() => {
    document.addEventListener('click', onContextMenuClose);

    return () => document.removeEventListener('click', onContextMenuClose);
  }, [show, onContextMenuClose])

  const handleClick = (e) => {
    const projectId = e.target.dataset.id;
    const options = {
      projectId,
      taskId
    }
    doFetch(options, 'POST');
  };

  return(
    <div ref={ctx} className="ctx-menu">
      { 
        show && (listOfProjects.length > 0) && (
          renderList(list, ContextMenuItem, handleClick)
        )
      }
      {children}
    </div>
  )
}

export default WithContextMenu;