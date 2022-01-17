import { useState, useContext, useEffect } from 'react'
import {Container, Paper, Grid, Box} from '@mui/material'

import { Header, AccountDetail, LoadingIndicator, ErrorIndicator } from "../components/components";

import AuthContext from '../contexts/authContext'

const AccountPage = () => {
  const { currentUser } = useContext(AuthContext)

  const [username, setUsername] = useState(currentUser.user.username);
  const [fullname, setFullname] = useState(currentUser.user.name);
  const [email, setEmail] = useState(currentUser.user.email);
  const [studentId, setStudentId] = useState(currentUser.user.studentId);


  return (
    <Paper style={{height:"250vh"}}>
      <Header />
      <Box component="main" >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <AccountDetail 
                  canEdit={true}
                  username={username}
                  fullname={fullname} setFullname={setFullname}
                  email={email} setEmail={setEmail}
                  studentId={studentId} setStudentId={setStudentId}
                />
              </Paper>
            </Grid>
          </Grid>
          
        </Container>
      </Box>
    </Paper>
  )
}

export default AccountPage;