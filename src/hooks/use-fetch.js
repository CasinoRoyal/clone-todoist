import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [value] = useLocalStorage('user');

  const doFetch = useCallback((options) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if(!isLoading) return;

    const fetchingOptions = {
      ...options,
      headers: {
        authorization: value ? value : '';
      }
    };

    axios(`${process.env.REACT_APP_BACKEND_URL}/${url}`, fetchingOptions)
      .then(res => {
        setResponse(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.response.data);
        setIsLoading(false)
      });

  }, [url, isLoading]);

  return [{response, isLoading, error}, doFetch];
};

export default useFetch;