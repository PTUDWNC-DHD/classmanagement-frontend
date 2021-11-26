import React, { useContext, useState } from "react";
import bcryptjs from "bcryptjs";
import { auth, googleProvider } from "../../lib/firebase";

import AuthContext from '../../context/AuthContext'

import { Image, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { Paper, Link, Grid, Box, Container, Typography } from "@mui/material";
import swal from 'sweetalert';
import { LockOutlined } from "@mui/icons-material"


const LoginForm = () => {
  const {setCurrentUser, setIsLoggedIn, setIsEmailNotRegistered} = useContext(AuthContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //function fetch to get login checking from server
  const fetchLoginAPI = (usernameToFetch, passwordToFetch) => {
    fetch(process.env.REACT_APP_API_URL+'/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameToFetch,
        password: passwordToFetch
      })
    })
    .then((res) => {
      if (res.status === 401) {
        if (usernameToFetch.indexOf('@') > 0){
          swal({
          title: "Login failed !!!",
          text: "Your email is not registered",
          icon: "error",
          button: "Register now !!!",
        });
          setIsEmailNotRegistered(true);
        }else {
          swal({
            title: "Error!",
            text: "Login failed !!!",
            icon: "error",
            button: "Cancel",
          });
        }
      } else {
        res.json().then((result) => {
          if (result.user) {
            setCurrentUser(result)
            setIsLoggedIn(true)
            swal({
              title: "Good job!",
              text: "Login successfully !!!",
              icon: "success",
              button: "Next",
            });
          } else {
            swal({
            title: "Error!",
            text: "Login failed !!!",
            icon: "error",
            button: "Cancel",
          });
            
          }
        })
      }
    })
    .catch((error) => {
      console.log('Login by account error: ', error)
    })
  }

  const handleLogin = (event, loginType) => {    
    //switch two type of login
    switch (loginType) {
      case 'account': default:
        event.preventDefault();
        fetchLoginAPI(username, password)
        break;
      case 'google':
        const saltRounds = 10
        const hashPassword = bcryptjs.hashSync(process.env.REACT_APP_LOGIN_BY_MAIL_SECRET, saltRounds)
        auth.signInWithPopup(googleProvider)
        .then((res) => {
          fetchLoginAPI(res.user.email, hashPassword)
        })
        .catch((error) => {
          console.log('Get account information by firebase error: ', error)
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
                <Box
          sx={{
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
