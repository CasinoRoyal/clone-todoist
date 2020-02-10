import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import useFetch from '../hooks/use-fetch';
import { userContext } from '../contexts/user-context';
import { types } from '../contexts/user-reducer';
import useLocalStorage from '../hooks/use-local-storage';

const Welcome = () => {
  const [, setValue] = useLocalStorage('token');
  const { state, dispatch } = useContext(userContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const requestUrl = isLogin ? 'users/login' : 'users/signup';
  const [{response, isLoading}, doFetch] = useFetch(requestUrl);

  useEffect(() => {
    if (response) {
      setValue(JSON.stringify(response));

      dispatch({
        type: types.LOGIN_USER,
        payload: { 
          token: response.token, 
          user: response.user
        }
      });
    };
  }, [response, dispatch, setValue])

  if (state && state.isLogged) {
    return <Redirect to='/' />
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = isLogin ? { email, password } : { username, email, password }

    doFetch(requestBody, 'POST');
  }; 


  return(
    <div className="welcome">
      <h2>Welcome page</h2>

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Register' : 'Click for enter'}
      </button>
      <small>{isLogin ? 'Sign up, it is free' : 'Have an account?'}</small>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
         )}     
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={!!isLoading}>{isLogin ? 'Log in' : 'Sign up'}</button>
      </form>
    </div>
  )
}

export default Welcome;