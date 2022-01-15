import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import VerifyAccountForm from '../components/VerifyAccountForm/VerifyAccountForm'

import { fetchActivateAccount, fetchRequestActivateAccount } from '../services/authService'

import * as Notifications from '../utils/notifications'



const VerifyAccountPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [navigateTo, setNavigateTo] = useState('');
  
  const email = params?.email;

  useEffect(()=>{
    if (navigateTo)
      navigate(navigateTo);
  },[navigateTo])

  const handleVerify = async (values) => {  
    const { code } = values;
    const result = await fetchActivateAccount(email, code)
    console.log('result after fetch: ', result)
    if (result.data){
      setNavigateTo('/login');
      Swal.fire({
        title: "Success",
        text:  Notifications.ACTIVATE_SUCCESS,
        icon: "success",
        button: "Next",
      })
    }
    else if (result.error) {
      Swal.fire({
        title: "Error",
        text: Notifications.ACTIVATE_FAILED,
        icon: "error",
        button: "Close",
      })
    }
  }

  const handleRequestVerify = async () => {    
    const result = await fetchRequestActivateAccount(email)
    //console.log('result after fetch: ', result)
    if (result.data){
      Swal.fire({
        title: "Success",
        text:  Notifications.REQUEST_ACTIVATE_SUCCESS,
        icon: "success",
        button: "Next",
      })
    }
    else if (result.error) {
      Swal.fire({
        title: "Error",
        text: Notifications.REQUEST_ACTIVATE_FAILED,
        icon: "error",
        button: "Close",
      })
    }
  }

  return (
    <VerifyAccountForm
      handleVerify={handleVerify}
      handleRequestVerify={handleRequestVerify}
    />
  )
}

export default VerifyAccountPage;