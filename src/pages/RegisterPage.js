import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { RegisterForm } from "../components/components";

import { fetchRegister } from '../services/authService'

import * as Notifications from '../utils/notifications'



import Swal from 'sweetalert2';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [verifyEmail, setVerifyEmail] = useState('');

  useEffect(()=>{
    //navigate to verify account page
    if (verifyEmail)
      navigate(`/verify/${verifyEmail}`);
  },[verifyEmail])

  const handleSubmit = async (values) => {
    const { username, fullname, email, password } = values;
    //call fetch to get register checking from server
    const result = await fetchRegister(username, fullname, email, password);
    if (result.data) {
      setVerifyEmail(email);
      Swal.fire({
        title: "Success",
        text: Notifications.REGISTER_SUCCESS,
        icon: "success",
        button: "Close",
      })
      
    }
    else if (result.error) {
      console.log('register fail: ', result)
      Swal.fire({
        title: "Error",
        text: Notifications.REGISTER_FAILED,
        icon: "error",
        button: "Close",
      })
    }
  }

  
  return (
    <RegisterForm 
      handleSubmit={handleSubmit}
    />
  )
}

export default RegisterPage;