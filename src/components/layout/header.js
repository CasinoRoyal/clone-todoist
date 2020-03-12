import React, { useContext, useEffect } from 'react';
import { FaPizzaSlice, FaDoorOpen, FaPlus } from 'react-icons/fa';

import useLocalStorage from '../../hooks/use-local-storage';
import { types } from '../../contexts/user-reducer';
import { userContext } from '../../contexts/user-context'

const Header = () => {
  const [,,removeValue] = useLocalStorage('token');
  const { state, dispatch } = useContext(userContext);
  
  useEffect(() => {
    if (!state.isLogged) {
      removeValue();
    }
  }, [state, removeValue])

  const handleLogoutClick = () => {
    dispatch({type: types.LOGOUT_USER });
  }

  return(
    <header className="header" data-testid="header">
      <nav className="nav">
        <div className="logo">
          <img src="/images/logo.png" alt="todoist-clone logo" />
        </div>
        <div className="settings">
          <ul className="settings__list">
            <li className="settings__item" data-testid="quick-add-task-action">
              <FaPlus />
            </li>
            <li className="settings__item" data-testid="dark-mode-action">
              <FaPizzaSlice />
            </li>
          </ul>
          <button className="settings__logout" onClick={handleLogoutClick}>
            <FaDoorOpen />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;