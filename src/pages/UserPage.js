import { useState, useRef, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {Container, Paper, Grid, Box} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Header, UserDetail } from "../components/components";

import { getUserDetail } from "../services/userService";
import AuthContext from "../contexts/authContext";

const UserPage = (props) => {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext)

  const [darkMode,setDarkMode] = useState(false);
  const [userDetail, setUserDetail] = useState(null);

  // state for display
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // get userId from path
  const path = location.pathname.split('/')
  const userId = useRef(path.at(-1));
  // create theme
  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" }
  })



  const callFetchUserDetail = async () => {
    setIsLoading(true);
    const result = await getUserDetail(currentUser.token, userId.current)
    if (result.data) {
      setUserDetail(result.data)
    }
    else if (result.error) {
      setErrorMessage(result.error)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    callFetchUserDetail();
  }, [])


  return (
    <ThemeProvider theme={theme}>
    <Paper style={{height:"250vh"}}>
      <Header check={darkMode} change={()=>setDarkMode(!darkMode)}/>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <UserDetail name={userDetail?.name} studentId={userDetail?.studentId} email={userDetail?.email}/>
              </Paper>
            </Grid>
          </Grid>
          
        </Container>
      </Box>
    </Paper>
  </ThemeProvider>
  )
}

export default UserPage;