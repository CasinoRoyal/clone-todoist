import React, { useState, useContext } from 'react';

import Welcome from './components/welcome';
import Header from './components/layout/header';
import Content from './components/layout/content';

// import { UserChecker } from './contexts/user-context';


function App() {
  // const = useContext(userContext);
  const [isLogged, setIsLogged] = useState(false);
  if (!isLogged) {
    return <Welcome />
  }

  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default App;
