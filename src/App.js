import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Header from './components/layout/header';
import Content from './components/layout/content';
import { userContext } from './contexts/user-context';
import { types } from './contexts/user-reducer';
import useLocalStorage  from './hooks/use-local-storage';

function App() {
  const [value,,removeValue] = useLocalStorage('token');
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    if (value && value.createAt < Date.now()) {
        return removeValue();
    }
  }, [value.user, removeValue])

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
