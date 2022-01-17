import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { ForgotPasswordForm } from '../components/components'

import { fetchForgotPassword } from '../services/authService'

import * as Notifications from '../utils/notifications'



const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [navigateTo, setNavigateTo] = useState('');
  

  useEffect(()=>{
    console.log('navigate: ', navigateTo)
    if (navigateTo)
      navigate(navigateTo);
  },[navigateTo])

  const handleRequestResetPassword = async (values) => {    
    const { email } = values;
    const result = await fetchForgotPassword(email)
    //console.log('result after fetch: ', result)
    if (result.data){
      setNavigateTo(`/reset/${email}`);
      Swal.fire({
        title: "Success",
        text:  Notifications.REQUEST_RESET_PASSWORD_SUCCESS,
        icon: "success",
        button: "Next",
      })
    }
    else if (result.error) {
      Swal.fire({
        title: "Error",
        text: Notifications.REQUEST_RESET_PASSWORD_FAILED,
        icon: "error",
        button: "Close",
      })
    }
  }


  return (
    <ForgotPasswordForm
      handleRequestVerify={handleRequestResetPassword}
    />
  )
}

export default ForgotPasswordPage;