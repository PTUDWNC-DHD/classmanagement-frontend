import { createContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [createClassDialog, setCreateClassDialog] = useState(false);
  const [joinClassDialog, setJoinClassDialog] = useState(false);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    isRegistered,
    setIsRegistered,
    currentUser,
    setCurrentUser,
    createClassDialog,
    setCreateClassDialog,
    joinClassDialog,
    setJoinClassDialog,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext
