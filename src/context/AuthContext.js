import { createContext, useState } from "react";

import { fetchAllClassrooms } from "../api/classroom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const [isRegistered, setIsRegistered] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isEmailNotRegistered, setIsEmailNotRegistered] = useState(false);

  const [createClassDialog, setCreateClassDialog] = useState(false);
  const [joinClassDialog, setJoinClassDialog] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchClassrooms = () => {
    const result = fetchAllClassrooms(currentUser.token, setIsLoading, setErrorMessage)
    setCurrentUser({...currentUser, classrooms: result})
  }

  const value = {
    isRegistered, setIsRegistered,
    isJoined, setIsJoined,
    isEmailNotRegistered, setIsEmailNotRegistered,
    currentUser, setCurrentUser,
    createClassDialog, setCreateClassDialog,
    joinClassDialog, setJoinClassDialog,
    isLoading, setIsLoading,
    errorMessage, setErrorMessage,
    fetchClassrooms
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext
