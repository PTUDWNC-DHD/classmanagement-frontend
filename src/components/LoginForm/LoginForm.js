import React, { useContext, useState } from "react";
import bcryptjs from "bcryptjs";
import { auth, googleProvider } from "../../lib/firebase";

import AuthContext from '../../context/AuthContext'

import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { Link, Grid, Box, Container, Typography } from "@mui/material";

import { LockOutlined } from "@mui/icons-material"


const LoginForm = () => {
  const {setCurrentUser, setIsLoggedIn} = useContext(AuthContext)
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
        window.alert('Login failed !!!')
      } else {
        res.json().then((result) => {
          if (result.user) {
            setCurrentUser(result)
            setIsLoggedIn(true)
            window.alert('Login successfully !!!');
          } else {
            window.alert(`Login failed: ${result.errors[0]}`);
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
      case 'account':
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
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
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
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
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
          >
            Login with Google Account
          </Button>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}

export default LoginForm;
