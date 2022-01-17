import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { getUserDetail } from "../services/userService"

import AuthContext from '../contexts/authContext'
import { removeFromLocalStorage } from "../utils/localStorage";
import * as Constant from "../utils/constant"




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
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const location = useLocation();

  //console.log('location: ', location)

  useEffect(()=>{
    const checkIsLoginExpired = async () => {
      if (currentUser) {
        const user = await getUserDetail(currentUser.token, currentUser.user._id);
        if (user.error) {
          removeFromLocalStorage(Constant.LOCAL_STORAGE_USER)
          setCurrentUser(null);
        }
      }
    }
    checkIsLoginExpired()
  },[])


  if (!currentUser) {
    return <Navigate to='/login' />
  }

  return children;
}

export {
  NonAuthRequired,
  AuthRequired
}