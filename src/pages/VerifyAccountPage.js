import React, { useContext, useState } from "react";

import { VerifyAccountForm } from "../components/components";

import { fetchActiveAccount, fetchRequestActiveAccount } from '../services/authService'

import AuthContext from '../contexts/authContext'

import * as Notifications from '../utils/notifications'


import Swal from 'sweetalert2';


const VerifyAccountPage = ({email}) => {
  const { setCurrentUser } = useContext(AuthContext)
  const [verifyCode, setVerifyCode] = useState('');


  const handleVerify = async () => {    
    const result = await fetchActiveAccount(email, verifyCode)
    console.log('result after fetch: ', result)
    if (result.data){
      Swal.fire({
        title: "Success",
        text:  Notifications.LOGIN_SUCCESSFULLY,
        icon: "success",
        button: "Next",
      })
    }
    else if (result.error) {
      Swal.fire({
        title: "Login failed !",
        text: result.error,
        icon: "error",
        button: "Close",
      })
    }
    
    
  }

  const handleRequestVerify = async () => {    
    const result = await fetchRequestActiveAccount(email)
    //console.log('result after fetch: ', result)
    let alert = {
      title: "Success",
      text:  Notifications.LOGIN_SUCCESSFULLY,
      icon: "success",
      button: "Next",
    } 
    
    if (result.data){
      setCurrentUser(result.data)
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

  return (
    <VerifyAccountForm
      handleVerify={handleVerify}
      setCode={setVerifyCode}
    />
  )
}

export default VerifyAccountPage;