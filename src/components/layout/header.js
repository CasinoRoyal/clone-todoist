import React from 'react';
import { FaPizzaSlice } from 'react-icons/fa';

const Header = () => {
  return(
    <header className="header" data-testid="header">
      <nav className="nav">
        <div className="logo">
          <img src="/images/logo.png" alt="todoist-clone logo" />
        </div>
        <div className="settings">
          <ul>
            <li className="settings__add" data-testid="quick-add-task-action">
              +
            </li>
            <li className="settings__darkmode" data-testid="dark-mode-action">
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;