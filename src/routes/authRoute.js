import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import AuthContext from '../contexts/authContext'




const NonAuthRequired = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation()

  const from = location.state?.from?.pathname || "/";

  if (currentUser) {
    return <Navigate to={from} replace={true} />
  }

  return children
}

const AuthRequired = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to='/login' state={{ from: location}} />
  }

  return children
}

export {
  NonAuthRequired,
  AuthRequired
}