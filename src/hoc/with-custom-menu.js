import React, { useEffect, useRef, useState } from 'react';

import { renderList } from '../utils/render-list'

const ContextMenuItem = ({itemName, handleClick, children}) => (
  <li className="ctx-menu__item" onClick={handleClick}>
    {itemName}
    {children}
  </li>
);

const WithContextMenu = ({ children }) => {
  const [show, setShow] = useState(false);
  const ctx = useRef();
  const list = [
    {name: 'Add to Today'}, 
    {name: 'Mark as completed'},
    {name: 'Move to...', nestedList: [{name: 'hello'}, {name: 'friend'}]}, 
    {name: 'Delete task'}
  ];

  const onContextMenu = (e) => {
    e.preventDefault();
    console.dir(e.target)
    setShow(true);
    const left = e.pageX;
    const top = e.pageY;

    ctx.current.firstElementChild.style.left = left + 'px';
    ctx.current.firstElementChild.style.top = top + 'px';
  }

  const onContextMenuClose = (e) => {
    if (show) {
      setShow(false);
    }
  }

  useEffect(() => {
    ctx.current.addEventListener('contextmenu', onContextMenu);

    return () => ctx.current.removeEventListener('contextmenu', onContextMenu);
  }, []);

  useEffect(() => {
    document.addEventListener('click', onContextMenuClose);

    return () => document.removeEventListener('click', onContextMenuClose);
  }, [show])

  const handleClick = (e) => {
    console.log(e.target)
  };
  return(
    <div ref={ctx} className="ctx-menu">
      { 
        show && renderList(list, ContextMenuItem, handleClick)
      }
      {children}
    </div>
  )
}

export default WithContextMenu;