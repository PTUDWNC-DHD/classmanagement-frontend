import { useState, useContext, useEffect } from 'react'
import { useParams } from "react-router-dom";
import {Container, Paper, Grid, Box} from '@mui/material'

import { Header, AccountDetail, LoadingIndicator, ErrorIndicator } from "../components/components";

import { getUserDetail } from '../services/userService'

import AuthContext from '../contexts/authContext'

const AccountPage = () => {
  const params = useParams();
  const userId = params?.id;
  
  const { currentUser } = useContext(AuthContext)

  const [canEdit, setCanEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [username, setUsername] = useState(currentUser.user.username);
  const [fullname, setFullname] = useState(currentUser.user.name);
  const [email, setEmail] = useState(currentUser.user.email);
  const [studentId, setStudentId] = useState(currentUser.user.studentId);

  useEffect(()=>{
    if (userId !== currentUser.user._id) {
      callFetchUserData();
      setCanEdit(false);
    }
    else {
      setCanEdit(true);
    }
      
  },[])

  const callFetchUserData = async () => {
    setIsLoading(true);
    const result = await getUserDetail(currentUser.token, userId)
    console.log('result fetch: ', result)
    if (result.data) {
      setFullname(result.data.name);
      setUsername(result.data.username);
      setEmail(result.data.email);
      setStudentId(result.data.studentId);
    }
    else if (result.error) {
      setHasError(true)
      console.log('fetch user error: ', result.error)
    }
    setIsLoading(false);
  }

  return (
    <Paper style={{height:"250vh"}}>
      <Header />
      <Box component="main" >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              {
                isLoading ? <Container sx={{ display: 'flex', justifyContent:'center', my: 5}}><LoadingIndicator /></Container> :
                hasError ? <Container sx={{ display: 'flex', justifyContent:'center', my: 5}}><ErrorIndicator /></Container> : 
                <AccountDetail 
                  canEdit={canEdit}
                  username={username}
                  fullname={fullname} setFullname={setFullname}
                  email={email} setEmail={setEmail}
                  studentId={studentId} setStudentId={setStudentId}
                />
              }
              </Paper>
            </Grid>
          </Grid>
          
        </Container>
      </Box>
    </Paper>
  )
}

export default AccountPage;