import { createContext } from 'react';

const userContext = createContext({
  isLogged: false,
  token: null,
  user: null,
  projects: null,
  logout: () => {}
});

export default userContext;