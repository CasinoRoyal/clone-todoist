import React from 'react';

const Header = () => {
  return(
    <header className="header" data-testid="header">
      <nav className="nav">
        <div className="logo">
          <img src="" alt="todoist-clone logo" />
        </div>
        <div className="settings">
          <ul>
            <li>+</li>
            <li>-</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;