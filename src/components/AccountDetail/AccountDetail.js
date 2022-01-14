import { useState, useContext } from 'react';
import Swal from 'sweetalert2';

import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Avatar, Typography, CardActions } from '@mui/material';

import { updateUserAccountInformation } from '../../services/userService'

import AuthContext from '../../contexts/authContext'

import * as Notifications from '../../utils/notifications'



const AccountDetail = (props) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  //console.log('currUser: ', currentUser)

  const [username, setUsername] = useState(currentUser.user.username);
  const [fullname, setFullname] = useState(currentUser.user.name);
  const [email, setEmail] = useState(currentUser.user.email);
  const [studentId, setStudentId] = useState(currentUser.user.studentId);
  

  const [hasChanged, setHasChanged] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  
  
  const handleSaveDetail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await updateUserAccountInformation(currentUser.token, fullname, email, studentId)
    if (result.data) {
      //console.log('user: ', result)
      setCurrentUser({...currentUser, user: {...result.data}})
      Swal.fire({
        title: "Success",
        text: Notifications.UPDATE_ACCOUNT_SUCCESS,
        icon: "success",
        button: "Close",
      });
    }
    else if (result.error) {
      Swal.fire({
        title: "Error",
        text: Notifications.UPDATE_ACCOUNT_FAILED,
        icon: "error",
        button: "Close",
      });
    }
    setIsLoading(false);
  }

  const handleCancel = (e) => {
    setFullname(currentUser.user.name)
    setEmail(currentUser.user.email)
    setStudentId(currentUser.user.studentId)
    setHasChanged(false)
  }

  const handleChangeFullname = (e) => {
    setFullname(e.target.value)
    setHasChanged(true)
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
    setHasChanged(true)
  }
  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
    setHasChanged(true)
  }
  
  const handleChangeStudentId = (e) => {
    setStudentId(e.target.value)
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
                onChange={handleChangeUsername}
                required
                value={username}
                variant="outlined"
                disabled
              />
            </Grid>
            
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="MSSV"
                name="studentID"
                onChange={handleChangeStudentId}
                required
                value={studentId}
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
          <Button sx={{marginRight: 2}} color="primary" variant="contained" onClick={handleCancel} disabled={!hasChanged}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleSaveDetail} disabled={!hasChanged}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountDetail;