import React, { useEffect, useRef, useState, useCallback } from 'react';

import ContextMenu from '../components/context-menu/context-menu';


const WithContextMenu = ({ listOfProjects = [], children }) => {
  const [show, setShow] = useState(false);
  const [coor, setCoor] = useState({});
  const [taskId, setTaskId] = useState(null);
  const ctx = useRef();

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    if (listOfProjects.length <= 0) {
      return;
    }

    if (show) {
      return setShow(false)
    }

    const li = e.target.closest('li');

    if (li) {
      setTaskId(li.dataset.taskid);
      setShow(true);
      setCoor({
        left: e.pageX,
        top: e.pageY
      })
    } 
  }, [listOfProjects, show]);

  const handleContextMenuClose = useCallback((e) => {
    if (show) {
      setShow(false);
    }
  }, [show]);

  const handleKeyDown = useCallback((e) => {
    if (e.keyCode === 27 && show) {
      handleContextMenuClose();
    }
  }, [show, handleContextMenuClose]);

  useEffect(() => {
    if (show) {
      ctx.current.firstElementChild.style.left = coor.left + 'px';
      ctx.current.firstElementChild.style.top = coor.top + 'px';
    }
  }, [show, coor, ctx])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return(
    <div
      ref={ctx}
      className="ctx-menu"
      onContextMenu={handleContextMenu}
    >
      { 
        show && (listOfProjects.length > 0) && (
          <ContextMenu 
            listOfProjects={listOfProjects} 
            apiUrl='tasks/moveTask'
            taskId={taskId}
            onContextMenuClose={handleContextMenuClose}
          />
        )
      }
      {children}
    </div>
  )
}

export default WithContextMenu;