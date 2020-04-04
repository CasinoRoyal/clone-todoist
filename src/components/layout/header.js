import React, { useContext } from 'react';

import UserPanel from './user-panel';
import { appContext } from '../../contexts/app-context'

const Header = () => {
  const { appState, setAppState } = useContext(appContext);

  const handleToggleHamburger = () => {
    setAppState((prevState) => ({
      ...prevState,
      isShowSidebar: !prevState.isShowSidebar
    }));
  }
  
  const hamburgerClassName = appState.isShowSidebar 
    ? "hamburger hamburger--active" 
    : "hamburger";

  return(
    <header className="header" data-testid="header">
      <nav className="nav">
        <button className={hamburgerClassName} onClick={handleToggleHamburger} />
        <div className="logo">
          <img src="/images/logo.png" alt="todoist-clone logo" />
        </div>
        <UserPanel />
      </nav>
    </header>
  );
};

export default Header;