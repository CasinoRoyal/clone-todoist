import React from 'react';
import { Redirect } from 'react-router-dom';

import Header from './components/layout/header';
import Content from './components/layout/content';
import useLocalStorage from './hooks/use-local-storage';
import userContext from './contexts/user-context';

function App() {
  const [value] = useLocalStorage('user');

  if (!value || value.length === 0) {
    return <Redirect to='/welcome' />
  }

  const parseValues = JSON.parse(value);
  const contextValues = {
    isLogged: !!parseValues.token, 
    token: parseValues.token,
    user: parseValues.user,
    projects: parseValues.projects.userProjects
  };
  return (
    <userContext.Provider value={contextValues}>
      <div className="App">
        <Header />
        <Content />
      </div>
    </userContext.Provider>
  );
}

export default App;
