import { Fragment, useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Container, Box} from '@mui/material'

import { JoinClass } from "../components/components";

import { joinClassroom } from "../services/joinService";
import { updateAndGetNewUserDetail } from "../services/userService"

import AuthContext from "../contexts/authContext";
import * as Notifications from "../utils/notifications"
import * as Constant from "../utils/constant"
import { saveToLocalStorage } from '../utils/localStorage'

const JoinPage = () => {
  const params = useParams();
  const navigate = useNavigate()
  const joinCode = params?.id;
  const type = params?.type;
  
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [navigateTo, setNavigateTo] = useState('');

  useEffect(()=>{
    if (navigateTo)
      navigate(navigateTo);
  },[navigateTo])

  const handleJoinClass = async (values) => {
    const newToken = await handleSaveDetail(values);
    if (newToken) {
      const result = await joinClassroom(newToken, joinCode, type)
      if (result.data) {
        Swal.fire({
          title: "Success",
          text: Notifications.JOIN_CLASS_SUCCESS,
          icon: "success",
          button: "Close",
        })
      }
      else if (result.error) {
        Swal.fire({
          title: "Error",
          text: Notifications.JOIN_CLASS_FAILED,
          icon: "error",
          button: "Close",
        })
      }
    }
    
    setNavigateTo('/');
  }
  
  const handleSaveDetail = async (values) => {
    const { studentId } = values;
    
    const result = await updateAndGetNewUserDetail(currentUser.token, {studentId: studentId})
    if (result.data) {
      setCurrentUser(result.data)
      saveToLocalStorage(result.data, Constant.LOCAL_STORAGE_USER)
      return result.data.token;
    }
    else if (result.error) {
      console.log('update student id err: ', result.error)
    }
  }
  
  return (
    <Fragment>
      <Box component="main">
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <JoinClass studentId={currentUser.user?.studentId} handleJoinClass={handleJoinClass}/>
          
        </Container>
      </Box>
    </Fragment>
  )
}

export default JoinPage;