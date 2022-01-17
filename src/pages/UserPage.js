import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import {Container, Paper, Grid, Box} from '@mui/material'

import { Header, AccountDetail , LoadingIndicator, ErrorIndicator } from "../components/components";

import { getUserDetail } from "../services/userService";

import AuthContext from "../contexts/authContext";


const UserPage = () => {
  const params = useParams();
  const userId = params?.id;
  const { currentUser } = useContext(AuthContext)

  const [userDetail, setUserDetail] = useState(null);

  // state for display
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  const callFetchUserDetail = async () => {
    
    setIsLoading(true);
    const result = await getUserDetail(currentUser.token, userId)
    console.log('user id: ', result)
    if (result.data) {
      setUserDetail(result.data)
    }
    else if (result.error) {
      setHasError(true)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    callFetchUserDetail();
  }, [])


  return (
    <Paper style={{height:"250vh"}}>
      <Header />
      <Box >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              {
                isLoading ? <Container sx={{ display: 'flex', justifyContent:'center', my: 5}}><LoadingIndicator /></Container> :
                hasError ? <Container sx={{ display: 'flex', justifyContent:'center', my: 5}}><ErrorIndicator /></Container> : 
                <AccountDetail 
                  canEdit={false}
                  fullname={userDetail?.name}
                  email={userDetail?.email}
                  studentId={userDetail?.studentId}
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

export default UserPage;