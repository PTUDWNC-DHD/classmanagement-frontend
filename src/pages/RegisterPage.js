import { useContext } from "react";
import { useNavigate } from "react-router-dom"

import { RegisterForm } from "../components/components";

import { fetchRegister } from '../services/authService'

import AuthContext from '../contexts/authContext'
import * as Notifications from '../utils/notifications'



import Swal from 'sweetalert2';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setIsRegistered, setIsEmailNotRegistered } = useContext(AuthContext)

  const handleSubmit = async (values) => {
    const { username, fullname, email, password } = values;
    //call fetch to get register checking from server
    const result = await fetchRegister(username, fullname, email, password);
    if (result.data) {
      setIsEmailNotRegistered(false)
      setIsRegistered(true)
      Swal.fire({
        title: "Success",
        text: Notifications.REGISTER_SUCCESS,
        icon: "success",
        button: "Close",
      })
      //navigate to verify account page
      navigate(`verify/${email}`);
    }
    else if (result.error) {
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