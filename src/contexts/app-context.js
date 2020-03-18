import React, {useState, createContext } from 'react';

const initialState = {
  isShowSidebar: false
}

export const appContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState(initialState);

  return (
    <appContext.Provider value={{appState, setAppState}}>
      {children}
    </appContext.Provider>
  );
}