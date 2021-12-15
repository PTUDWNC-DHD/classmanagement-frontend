import { createContext, useState } from "react";
import { loadFromLocalStorage } from "../utils/localStorage";
import * as Constant from '../utils/constant'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => loadFromLocalStorage(Constant.LOCAL_STORAGE_USER))

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
