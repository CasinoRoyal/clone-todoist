import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Header from './components/layout/header';
import Content from './components/layout/content';
import { userContext } from './contexts/user-context';

function App() {
  const { state } = useContext(userContext);
  console.log(state)
  if (!state || !state.isLogged) {
    return <Redirect to='/welcome' />
  }

  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default App;
