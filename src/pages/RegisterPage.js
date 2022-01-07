import { useContext, useState } from "react";

import { RegisterForm } from "../components/components";

import AuthContext from '../contexts/authContext'

import { fetchRegister } from '../services/authService'

import * as Notifications from '../utils/notifications'



import Swal from 'sweetalert2';

const RegisterPage = (props) => {
  const { setIsRegistered, setIsEmailNotRegistered } = useContext(AuthContext)

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    //call fetch to get register checking from server
    const result = await fetchRegister(username, fullname, email, password);
    if (result.data) {
      setIsEmailNotRegistered(false)
      setIsRegistered(true)
      Swal.fire({
        title: "Success",
        text: Notifications.REGISTER_SUCCESSFULLY,
        icon: "success",
        button: "Close",
      })
    }
    else if (result.error) {
      Swal.fire({
        title: "Error",
        text: result.error,
        icon: "error",
        button: "Close",
      })
    }
  }

  
  return (
    <RegisterForm 
      setFullname={setFullname}
      setUsername={setUsername}
      email={email} setEmail={setEmail}
      password={password} setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  )
}

export default RegisterPage;