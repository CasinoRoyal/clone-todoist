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
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && state.currentTask) {
        dispatch({ type: types.SET_CURRENT_TASK, payload: null });
      }
    })
  }, [state, dispatch])

  useEffect(() => {
    if (value && !state.isLogged) {
      if (value.createAt < Date.now()) {
        return removeValue();
      }

      dispatch({ 
        type: types.LOGIN_USER, 
        payload: {
          token: value.token,
          user: value.user
        }
      });
    }
  }, [value, state, dispatch])

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
