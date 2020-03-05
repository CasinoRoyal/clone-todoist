import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './tasks-reducer';

export const tasksContext = createContext(initialState);

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <tasksContext.Provider value={{state, dispatch}}>
      {children}
    </tasksContext.Provider>
  );
};
