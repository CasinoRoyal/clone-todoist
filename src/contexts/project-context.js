import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './project-reducer';

export const projectContext = createContext(initialState);

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <projectContext.Provider value={{state, dispatch}}>
      {children}
    </projectContext.Provider>
  );
};
