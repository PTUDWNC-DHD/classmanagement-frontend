import React, { useContext, useState } from "react";

import { LoginForm } from "../components/components";

import { fetchLogin } from '../services/authService'

import AuthContext from '../contexts/authContext'
import { auth, googleProvider } from "../lib/firebase";

import { saveToLocalStorage } from '../utils/localStorage'
import * as Notifications from '../utils/notifications'
import * as Constant from '../utils/constant'

import Swal from 'sweetalert2';


const LoginPage = (props) => {
  const { setCurrentUser } = useContext(AuthContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  //function fetch to get login checking from server
  const callLoginAPI = async (usernameToFetch, passwordToFetch) => {
    const result = await fetchLogin(usernameToFetch, passwordToFetch)
    //console.log('result after fetch: ', result)
    let alert = {
      title: "Success",
      text:  Notifications.LOGIN_SUCCESSFULLY,
      icon: "success",
      button: "Next",
    } 
    
    if (result.data){
      setCurrentUser(result.data)
      //console.log('curr: ', result.data)
      saveToLocalStorage(result.data, Constant.LOCAL_STORAGE_USER)
    }
    else if (result.error) {
      alert = {
        title: "Login failed !",
        text: result.error,
        icon: "error",
        button: "Close",
      }
    }
    Swal.fire(alert)
  }

  const handleLogin = (event, loginType) => {    
    //switch two type of login
    switch (loginType) {
      case 'account': default:
        event.preventDefault();
        callLoginAPI(username, password)
        break;
      case 'google':
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
        break;
    }
    
  }

  return (
    <LoginForm
      handleLogin={handleLogin}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  )
}

export default LoginPage;