import { createContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [createClassDialog, setCreateClassDialog] = useState(false);
  const [joinClassDialog, setJoinClassDialog] = useState(false);

  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClassrooms = () => {
    setIsLoading(true);
    fetch(process.env.REACT_APP_API_URL + '/api/user/me/classes', { 
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+ currentUser.token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((result) => {
      setCurrentUser({...currentUser, classrooms: result})
      setIsLoading(false);
    })
    .catch((error) => {
      setIsError(error);
      setIsLoading(false);
    })
  }

  const value = {
    isLoggedIn, setIsLoggedIn,
    isRegistered, setIsRegistered,
    currentUser, setCurrentUser,
    createClassDialog, setCreateClassDialog,
    joinClassDialog, setJoinClassDialog,
    isLoading, setIsLoading,
    isError, setIsError,
    fetchClassrooms
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext
