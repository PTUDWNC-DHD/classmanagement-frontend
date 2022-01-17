import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { VerifyForm, ResetPasswordForm } from '../components/components'

import { fetchForgotPassword, fetchCheckResetPasswordCode, fetchResetPassword } from '../services/authService'

import * as Notifications from '../utils/notifications'



const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [navigateTo, setNavigateTo] = useState('');
  const [resetToken, setResetToken] = useState('');
  
  const email = params?.email;

  useEffect(()=>{
    if (navigateTo)
      navigate(navigateTo);
  },[navigateTo])

  const handleRequestResetPassword = async () => {    
    const result = await fetchForgotPassword(email)
    //console.log('result after fetch: ', result)
    if (result.data){
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

  const handleVerifyResetCode = async (values) => {  
    const { code } = values;
    const result = await fetchCheckResetPasswordCode(email, code)
    console.log('result after fetch: ', result)
    if (result.data){
      console.log('request result: ', result.data)
      setResetToken(result.data);
    }
    else if (result.error) {
      console.log('request error: ', result.error)
      Swal.fire({
        title: "Error",
        text: Notifications.RESET_CODE_WRONG,
        icon: "error",
        button: "Close",
      })
      setResetToken('');
    }
  }

  const handleResetPassword = async (values) => {  
    const { password } = values;
    const result = await fetchResetPassword(resetToken, password)
    console.log('result after fetch: ', result)
    if (result.data){
      console.log('request result: ', result.data)
      setNavigateTo('/login');
      Swal.fire({
        title: "Success",
        text:  Notifications.RESET_PASSWORD_SUCCESS,
        icon: "success",
        button: "Next",
      })
    }
    else if (result.error) {
      console.log('request error: ', result.error)
      Swal.fire({
        title: "Error",
        text: Notifications.RESET_PASSWORD_FAILED,
        icon: "error",
        button: "Close",
      })
    }
    setResetToken('');
  }

  if (resetToken) {
    return (
      <ResetPasswordForm
        handleSubmit={handleResetPassword}
      />
    )
  }
  else {
    return (
      <VerifyForm
        title='Reset Password'
        handleVerify={handleVerifyResetCode}
        handleRequestVerify={handleRequestResetPassword}
      />
    )
  }
}

export default ResetPasswordPage;