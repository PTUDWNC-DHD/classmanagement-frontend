import React, { useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../../lib/firebase";

import AuthContext from '../../context/AuthContext'
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/localStorage'
import { fetchLogin } from '../../api/auth'
import * as Notifications from '../../utils/notifications'

import { Image, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { Paper, Link, Grid, Box, Container, Typography } from "@mui/material";
import Swal from 'sweetalert2';
import { LockOutlined } from "@mui/icons-material"


const LoginForm = () => {
  const { setCurrentUser, setIsEmailNotRegistered} = useContext(AuthContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  useEffect(()=>{
    const savedUser = loadFromLocalStorage('user_infor')
    if (savedUser) {
      setCurrentUser(savedUser)
    }
  },[])
  //function fetch to get login checking from server
  const callLoginAPI = async (usernameToFetch, passwordToFetch) => {
    const result = await fetchLogin(usernameToFetch, passwordToFetch)
    //console.log('result after fetch: ', result)
    let alert = {
      title: "Good job !",
      text:  Notifications.LOGIN_SUCCESSFULLY,
      icon: "success",
      button: "Next",
    } 
    
    if (result.data){
      setCurrentUser(result.data)
      //saveToLocalStorage(result, 'user_infor')
    }
    else if (result.error) {
      alert = {
        title: "Login failed !",
        text: result.error,
        icon: "error",
        button: "Close",
      }
      if (result.error === Notifications.EMAIL_NOT_REGISTER) {
        setIsEmailNotRegistered(true)
        alert.button = "Register now"
      }
    }
    Swal.fire(alert)
  }

  const handleLogin = (event, loginType) => {    
    //switch two type of login
    switch (loginType) {
      case 'account': default:
        event.preventDefault();
        callLoginAPI(username, password)
        break;
      case 'google':
        auth.signInWithPopup(googleProvider)
        .then((res) => {
          auth.currentUser.getIdToken().then((token)=>{
            callLoginAPI(res.user.email, token)
          })
        })
        .catch((error) => {
          //console.log('Get account information by firebase error: ', error)
          Swal.fire({
            title: "Login failed !",
            text: Notifications.GET_GG_ACCOUNT_FAILED,
            icon: "error",
            button: "Close",
          })
        })
        break;
    }
    
  }

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex' }}>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[0]
                  : theme.palette.grey[0],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar src="../logo512.png"  variant="square"/>
                
                      <Typography component="h1" variant="h5">
                        Sign in
                      </Typography>
                      <Box component="form" onSubmit={(e) => {handleLogin(e, 'account')}} noValidate sx={{ mt: 1 }}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="username"
                          label="Username"
                          name="username"
                          autoComplete="username"
                          onChange={(e)=>{setUsername(e.target.value)}}
                          autoFocus
                          color="success"
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          onChange={(e)=>{setPassword(e.target.value)}}
                          autoComplete="current-password"
                          color="success"
                        />
                        <FormControlLabel
                          control={<Checkbox value="remember" color="primary" />}
                          label="Remember me"
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          color="success"
                        >
                          Sign In
                        </Button>
                        <Grid container>
                          <Grid item xs >
                            <Link href="#" variant="body2">
                              Forgot password?
                            </Link>
                          </Grid>
                          <Grid item>
                            <Link href="/register" variant="body2" >
                              {"Don't have an account? Sign Up"}
                            </Link>
                          </Grid>
                        </Grid>
                      </Box>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(e) => {handleLogin(e, 'google')}}
                        color="success"
                      >
                        Login with Google Account
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export default LoginForm;
