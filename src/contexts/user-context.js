import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './user-reducer';

export const userContext = createContext(initialState);


export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <userContext.Provider value={{state, dispatch}}>
      {children}
    </userContext.Provider>
  );
};