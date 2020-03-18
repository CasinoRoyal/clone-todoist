import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Header from './components/layout/header';
import Content from './components/layout/content';
import { userContext } from './contexts/user-context';
import { AppProvider } from './contexts/app-context';
import { types } from './contexts/user-reducer';
import useLocalStorage  from './hooks/use-local-storage';

function App() {
  const [value,,removeValue] = useLocalStorage('token');
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    if (value && value.createAt < Date.now()) {
        return removeValue();
    }

    if (value && !state.isLogged) {
      dispatch({ 
        type: types.LOGIN_USER, 
        payload: { 
          token: value.token,
          user: value.user
        }
      })
    }
  }, [value, removeValue, dispatch, state.isLogged])

  if (!state || !state.isLogged) {
    dispatch({ type: types.LOGOUT_USER });

    return <Redirect to='/welcome' />
  }

  return (
    <AppProvider>
      <div className="App">
        <Header />
        <Content />
      </div>
    </AppProvider>
  );
}

export default App;