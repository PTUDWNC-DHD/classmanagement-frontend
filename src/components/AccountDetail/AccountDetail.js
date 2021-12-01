import { useState, useContext } from 'react';

import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Avatar, Typography, CardActions } from '@mui/material';

import AuthContext from '../../context/AuthContext'
import swal from 'sweetalert';
const AccountDetail = (props) => {
  const { currentUser } = useContext(AuthContext)

  const [username, setUsername] = useState(currentUser.user.username);
  const [fullname, setFullname] = useState(currentUser.user.name);
  const [email, setEmail] = useState(currentUser.user.email);
  const [hasChanged, setHasChanged] = useState(false)
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  
  const handleSaveDetail = (e) => {
    e.preventDefault();

    setIsLoading(true);
    fetch(process.env.REACT_APP_API_URL + '/api/user/me', { 
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer '+ currentUser.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: fullname,
        email: email,
        
      })
    })
    .then(res => res.json())
    .then((result) => {
      if (result.errors) {
        console.log(result.errors);
        setError(result.errors);
        setIsLoading(false);
      } else {
        swal({
          title: "Good job!",
          text: "Update information successfully !!!",
          icon: "success",
          button: "Close",
        });
        setIsLoading(false);
      }
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    })
  }

  const handleChangeFullname = (e) => {
    setFullname(e.target.value)
    setHasChanged(true)
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
    setHasChanged(true)
  }
  
  return (
    <form autoComplete="off" noValidate >
      <Card >
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar src={'./avatar.jpg'}></Avatar>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              {username}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            fullWidth
            variant="text"
          >
            Upload picture
          </Button>
        </CardActions>
      </Card>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3} >
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="Full name"
                name="fullName"
                onChange={handleChangeFullname}
                required
                value={fullname}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChangeEmail}
                required
                value={email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="User name"
                name="username"
                onChange={handleChangeEmail}
                required
                value={email}
                variant="outlined"
                disabled="enable"
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={handleChangeEmail}
                required
                value={email}
                variant="outlined"
                disabled="enable"
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="MSSV"
                name="studentID"
                onChange={handleChangeEmail}
                required
                value={email}
                variant="outlined"
                disabled="enable"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained" onClick={handleSaveDetail} disabled={!hasChanged}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountDetail;