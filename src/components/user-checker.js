import useLocalStorage from '../hooks/use-local-storage';
import useFetch from '../hooks/use-fetch';

const fetchUser = async () => {
}

export const UserChecker = ({ children }) => {
  const [value] = useLocalStorage('user');
  const [, doFetch] = useFetch('/users');
  console.dir(value);


  return children;
}