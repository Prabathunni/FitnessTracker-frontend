import React, { createContext, useContext, useState } from 'react';

// Step 1: Create the context
const AuthContext = createContext();

// Step 2: Create the provider component
export const AuthProvider = ({ children }) => {

  const [isUserLogged, setIsUserLogged] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false)

  return (
    <AuthContext.Provider value={{ isUserLogged, setIsUserLogged, showPopUp, setShowPopUp }}>
      {children}
    </AuthContext.Provider>
  );
};

// Step 3: Create a custom hook for easy usage
export const useAuth = () => useContext(AuthContext);
