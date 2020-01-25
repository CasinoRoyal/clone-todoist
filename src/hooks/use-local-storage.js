import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue = '') => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value])

  const removeValue = () => localStorage.removeItem(key);

  return [value, setValue, removeValue];
};

export default useLocalStorage;