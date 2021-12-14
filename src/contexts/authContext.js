import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const [isRegistered, setIsRegistered] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isEmailNotRegistered, setIsEmailNotRegistered] = useState(false);

  const value = {
    isRegistered, setIsRegistered,
    isJoined, setIsJoined,
    isEmailNotRegistered, setIsEmailNotRegistered,
    currentUser, setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext
