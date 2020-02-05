import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import useLocalStorage from './use-local-storage';

const useFetch = (url) => {
  const [requestMethod, setRequestMethod] = useState('');
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState(null);
  const [isLoading, setIsLoading] = useState({});
  const [error, setError] = useState(null);
  const [value] = useLocalStorage('user');

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
        authorization: value ? `Bearer ${value}` : ''
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
        setError(err.response.data);
        setIsLoading(false)
      });

  }, [url, isLoading, options, value, requestMethod]);

  return [{response, isLoading, error}, doFetch];
};

export default useFetch;
