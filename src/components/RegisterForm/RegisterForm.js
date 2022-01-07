import { useState, useEffect } from "react";
import { 
  Avatar, 
  Button, 
  TextField, 
  Link, 
  Grid, 
  Box, 
  Container, 
  Typography } from "@mui/material";
import { LockOutlined } from '@mui/icons-material'

import { Copyright } from "../components"

import { validateEmail } from "../../utils/validateUtil";

const RegisterForm = ({
  setFullname,
  setUsername,
  setEmail,
  password, setPassword,
  handleSubmit,

}) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAllInputValid, setIsAllInputValid] = useState(false);
  //
  const defaultChecker = { error: false, hasChanged: false, text: '' };
  // checker
  const [fullnameChecker, setFullnameChecker] = useState(defaultChecker);
  const [usernameChecker, setUsernameChecker] = useState(defaultChecker);
  const [emailChecker, setEmailChecker] = useState(defaultChecker);
  const [passwordChecker, setPasswordChecker] = useState(defaultChecker);
  const [confirmPasswordChecker, setConfirmPasswordChecker] = useState(defaultChecker);
  

  useEffect(()=>{
    if (
      !fullnameChecker.hasChanged ||
      !usernameChecker.hasChanged ||
      !emailChecker.hasChanged ||
      !passwordChecker.hasChanged ||
      !confirmPasswordChecker.hasChanged 
    )
      setIsAllInputValid(false)
    else if (
      (!fullnameChecker.error && fullnameChecker.hasChanged) &&
      (!usernameChecker.error && usernameChecker.hasChanged) &&
      (!emailChecker.error && emailChecker.hasChanged) &&
      (!passwordChecker.error && passwordChecker.hasChanged) &&
      (!confirmPasswordChecker.error && confirmPasswordChecker.hasChanged) 
    )
      setIsAllInputValid(true)
    else
      setIsAllInputValid(false)
  },[fullnameChecker, usernameChecker, passwordChecker, confirmPasswordChecker, emailChecker])

  const handleFullnameChange = (event) => {
    const value = event.target.value;
    setFullname(value);
    if (value)
      setFullnameChecker(defaultChecker)
    else
      setFullnameChecker({
        error: true,
        hasChanged: true,
        text: 'Fullname must not be null !'
      })
  }

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    if (value)
      setUsernameChecker({defaultChecker})
    else
      setUsernameChecker({
        error: true,
        hasChanged: true,
        text: 'Username must not be null !'
      })
  }

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    if (validateEmail(value))
      setEmailChecker(defaultChecker)
    else
      setEmailChecker({
        error: true,
        hasChanged: true,
        text: 'Email is invalid !'
      })
  }

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (!value) {
      setPasswordChecker({
        error: true,
        hasChanged: true,
        text: 'Password must not be null !'
      })
    } else {
      setPasswordChecker(defaultChecker)
      if (value !== confirmPassword) 
        setConfirmPasswordChecker({
          error: true,
          hasChanged: true,
          text: 'Password is not matched !'
        })
      else 
        setConfirmPasswordChecker({
          error: false,
          hasChanged: true,
          text: 'Password is matched !'
        })
    }
  }

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
    if (password === value)
      setConfirmPasswordChecker({
        error: false,
        hasChanged: true,
        text: 'Password is matched !'
      })
    else
      setConfirmPasswordChecker({
        error: true,
        hasChanged: true,
        text: 'Password is not matched !'
      })
  }

  return (
    <Container component="main" maxWidth="xs">
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
        <Typography variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Full Name"
                name="fullname"
                onChange={handleFullnameChange}
                autoComplete="full-name"
                autoFocus
                helperText={fullnameChecker.text}
                error={fullnameChecker.error}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Username"
                name="username"
                onChange={handleUsernameChange}
                autoComplete="username"
                helperText={usernameChecker.text}
                error={usernameChecker.error}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                onChange={handleEmailChange}
                autoComplete="email"
                helperText={emailChecker.text}
                error={emailChecker.error}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                onChange={handlePasswordChange}
                autoComplete="new-password"
                helperText={passwordChecker.text}
                error={passwordChecker.error}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                name="confirm-password"
                type="password"
                onChange={handleConfirmPasswordChange}
                autoComplete="new-password"
                helperText={confirmPasswordChecker.text}
                error={confirmPasswordChecker.error}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isAllInputValid}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container> 
  );
}

export default RegisterForm;