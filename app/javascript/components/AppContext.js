import React, { createContext, useContext, useReducer } from 'react';
import initialState from './initialState'; // Your initial state object
import StateHandler from './reducers/stateHandler'; // Your state handler/reducer

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StateHandler, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
