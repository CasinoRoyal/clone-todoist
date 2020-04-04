import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import useFetch from '../hooks/use-fetch';
import { userContext } from '../contexts/user-context';
import { types } from '../contexts/user-reducer';
import useLocalStorage from '../hooks/use-local-storage';
import Spinner from '../components/layout/spinner';
import ErrorModal from '../components/layout/error-modal';

const Welcome = () => {
  const [value, setValue] = useLocalStorage('token');
  const { state, dispatch } = useContext(userContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [modalClose, setModalClose] = useState(false);
  const requestUrl = isLogin ? 'users/login' : 'users/signup';
  const [{response, isLoading, error}, doFetch] = useFetch(requestUrl);

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

  if (state && state.isLogged && value.token) {
    return <Redirect to='/' />
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = isLogin ? { email, password } : { username, email, password }

    doFetch(requestBody, 'POST');
    setModalClose(false);
  }; 

  const handleModalClose = () => {
    setModalClose(true);
  }

  return(
    <div className="welcome">
      <h2>Simple clone of Todoist app</h2>

      {isLoading && <Spinner />}
      {
        (error && !isLoading && !modalClose) && (
          <ErrorModal errorMsg={error} onClose={handleModalClose} />
        )
      }
      
      <div className="welcome__box">
        <small className="welcome__signature">
          {isLogin ? 'Sign up, it is free' : 'Have an account?'}
        </small>
        
        <button 
          className="welcome__signature-link" 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Register' : 'Log in'}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            required
          />
         )}     
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <button 
          className="welcome__submit"
          type="submit" 
          disabled={!!isLoading}
        >
          {isLogin ? 'Log in' : 'Sign up'}
        </button>
      </form>
    </div>
  )
}

export default Welcome;