import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Box, Checkbox, FormControlLabel, CardHeader, Card, CardContent, Grid, Divider, TextField } from "@mui/material";

import AuthContext from "../../contexts/authContext";
import { joinClassroom } from "../../services/joinService";

import * as Notifications from "../../utils/notifications"

import Swal from 'sweetalert2'

import "./style.css";

const JoinClass = (props) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const [studentId, setStudentId] = useState(currentUser.user.studentId);
  const [isAccepted, setIsAccepted] = useState(false);
  

  const handleChangeStudentId = (e) => {
    setStudentId(e.target.value)
  }

  const handleJoinClass = async (e) => {
    e.preventDefault();
    if (studentId){
      const result = await joinClassroom(currentUser.token, props.joinCode, props.type)
      if (result.data) {
        Swal.fire({
          title: "Success",
          text: Notifications.JOIN_CLASS_SUCCESSFULLY,
          icon: "success",
          button: "Close",
        })
      }
      else if (result.error) {
        let text = Notifications.JOIN_CLASS_FAILED
        if (result.error[0].indexOf('already been in class'))
          text = Notifications.ALREADY_BEEN_IN_CLASS
        Swal.fire({
          title: "Error",
          text: text,
          icon: "error",
          button: "Close",
        })
      }
      navigate('/')
    }
    else {
      Swal.fire({
        title: "Warning",
        text: Notifications.PLEASE_ENTER_STUDENT_ID,
        icon: "warning",
        button: "Close",
      })
    }
  }

  const handleCancel = (e) => {
    navigate('/')
  }

  return (
    <Card>
        <CardHeader
          subheader="You are invited to join a classroom"
          title="Join class Dialog"
        />
        <Divider />
        <CardContent>
          <Grid item md={6} xs={12} >
            <TextField
              fullWidth
              label="Your student ID"
              name="studentId"
              onChange={handleChangeStudentId}
              required
              value={studentId}
              variant="outlined"
              disabled={studentId ? true : false}
              helperText="Your student ID can not be changed after updated !!!"
            />
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: "space-between",
            p: 2
          }}
        >
          <FormControlLabel
            control={<Checkbox color="primary" onChange={() => setIsAccepted(!isAccepted)} />}
            label="I accept to join"
          />
          <div>
            <Button sx={{marginRight: 2}} color="primary" variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleJoinClass} color="primary" variant="contained" disabled={!isAccepted}>
              Join class
            </Button>  
          </div>
          
        </Box>
      </Card>
  );
};

export default JoinClass;
