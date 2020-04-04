import React, { useContext } from 'react';
import { FaPizzaSlice, FaDoorOpen, FaPlus } from 'react-icons/fa';

import useLocalStorage from '../../hooks/use-local-storage';
import { types } from '../../contexts/user-reducer';
import { userContext } from '../../contexts/user-context'

const UserPanel = () => {
  const [,,removeValue] = useLocalStorage('token');
  const { dispatch } = useContext(userContext);

  const handleLogoutClick = () => {
    dispatch({type: types.LOGOUT_USER });
    removeValue();
  }

  return (
    <div className="settings">
{/*      <ul className="settings__list">
        <li className="settings__item" data-testid="quick-add-task-action">
          <FaPlus />
        </li>
        <li className="settings__item" data-testid="dark-mode-action">
          <FaPizzaSlice />
        </li>
      </ul>*/}
      <button className="settings__logout" onClick={handleLogoutClick}>
        <FaDoorOpen />
      </button>
    </div>
  );
};

export default UserPanel;