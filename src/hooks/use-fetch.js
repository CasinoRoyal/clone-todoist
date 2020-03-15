import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';

import { userContext } from '../contexts/user-context';

const useFetch = (url) => {
  const { state } = useContext(userContext);
  const [requestMethod, setRequestMethod] = useState('');
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const doFetch = useCallback((options, method = 'GET') => {
    setRequestMethod(method);
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if(!isLoading) return;
    const fetchingOptions = {
      data: {...options},
      headers: {
        authorization: state.token ? `Bearer ${state.token}` : ''
      },
      withCredentials: true
    };

    axios({
      method: requestMethod, 
      url: `http://127.0.0.1:8000/api/${url}`, 
      ...fetchingOptions
    })
      .then(res => {
        setResponse(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.dir(err)
        setError(err.response.data.message);
        setIsLoading(false)
      });

  }, [url, isLoading, options, state, requestMethod]);

  return [{response, isLoading, error}, doFetch];
};

export default useFetch;
