import  { createContext } from 'react';

// Create a Context
const GlobalContext = createContext();

// Create a Provider component
export const GlobalProvider = ({ children }) => {


  return (
    <GlobalContext.Provider value={{ }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
