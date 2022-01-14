import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import VerifyAccountForm from '../components/VerifyAccountForm/VerifyAccountForm'

import { fetchActivateAccount, fetchRequestActivateAccount } from '../services/authService'

import * as Notifications from '../utils/notifications'


import Swal from 'sweetalert2';


const VerifyAccountPage = () => {
  const params = useParams();
  const email = params?.email;

  const [verifyCode, setVerifyCode] = useState('');


  const handleVerify = async (e) => {  
    e.preventDefault();  
    const result = await fetchActivateAccount(email, verifyCode)
    console.log('result after fetch: ', result)
    if (result.data){
      Swal.fire({
        title: "Success",
        text:  Notifications.ACTIVATE_SUCCESS,
        icon: "success",
        button: "Next",
      })
    }
    else if (result.error) {
      Swal.fire({
        title: "Login failed !",
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
        title: "Login failed !",
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
      setCode={setVerifyCode}
    />
  )
}

export default VerifyAccountPage;