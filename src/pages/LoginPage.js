import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { LoginForm } from "../components/components";

import { fetchLogin } from '../services/authService'

import AuthContext from '../contexts/authContext'
import { auth, googleProvider } from "../lib/firebase";

import { saveToLocalStorage } from '../utils/localStorage'
import * as Notifications from '../utils/notifications'
import * as Constant from '../utils/constant'




const LoginPage = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext)

  const [navigateTo, setNavigateTo] = useState('');

  useEffect(()=>{
    if (navigateTo)
      navigate(navigateTo);
  },[navigateTo])

  //function fetch to get login checking from server
  const callLoginAPI = async (usernameOrEmail, passwordOrToken) => {
    const result = await fetchLogin(usernameOrEmail, passwordOrToken)
    //console.log('result after fetch: ', result)
    let alert = {
      title: "Success",
      text:  Notifications.LOGIN_SUCCESS,
      icon: "success",
      button: "Next",
    } 
    
    if (result.data){
      setCurrentUser(result.data)
      //console.log('curr: ', result.data)
      saveToLocalStorage(result.data, Constant.LOCAL_STORAGE_USER)
      setNavigateTo('/');
    }
    else if (result.error) {
      alert = {
        title: "Error",
        text: Notifications.LOGIN_FAILED,
        icon: "error",
        button: "Close",
      }
    }
    Swal.fire(alert)
  }

  const loginByAccount = async (values) => {    
    //console.log('values: ', values)
    await callLoginAPI(values.username, values.password)
  }

  const loginByGoogle = () => {
    auth.signInWithPopup(googleProvider)
    .then((res) => {
      auth.currentUser.getIdToken().then((token)=>{
        callLoginAPI(res.user.email, token)
      })
    })
    .catch((error) => {
      //console.log('Get account information by firebase error: ', error)
      Swal.fire({
        title: "Login failed !",
        text: Notifications.GET_GG_ACCOUNT_FAILED,
        icon: "error",
        button: "Close",
      })
    })
  }

  return (
    <LoginForm
      handleLoginByAccount={loginByAccount}
      handleLoginByGoogle={loginByGoogle}
    />
  )
}

export default LoginPage;