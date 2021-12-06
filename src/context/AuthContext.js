import { createContext, useState } from "react";

import { getAllClassrooms } from "../api/classroom";

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

  const fetchClassrooms = async () => {
    setIsLoading(true);
    const result = await getAllClassrooms(currentUser.token)
    if (result.data) {
      setCurrentUser({...currentUser, classrooms: result.data})
    }
    else if (result.error) {
      setErrorMessage(result.error)
    }
    setIsLoading(false);
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
