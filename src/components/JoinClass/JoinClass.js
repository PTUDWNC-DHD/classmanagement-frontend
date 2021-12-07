import React, { useState, useContext } from "react";

import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";

import AuthContext from "../../context/AuthContext";
import { joinClassroom } from "../../api/join";
import * as Notifications from "../../utils/notifications"

import Swal from 'sweetalert2'

import "./style.css";

const JoinClass = (props) => {
  const { currentUser, setIsJoined, fetchClassrooms } = useContext(AuthContext);

  const [displayName, setDisplayName] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [studentId, setStudentId] = useState('');

  const handleJoinClass = async (e) => {
    e.preventDefault();
    if (displayName){
      const result = await joinClassroom(currentUser.token, props.joinCode, displayName, studentId, isStudent)
      if (result.data) {
        fetchClassrooms()
        Swal.fire({
          title: "Success",
          text: Notifications.JOIN_CLASS_SUCCESSFULLY,
          icon: "success",
          button: "Close",
        })
      }
      else if (result.error) {
        Swal.fire({
          title: "Error",
          text: Notifications.JOIN_CLASS_FAILED,
          icon: "error",
          button: "Close",
        })
      }
      setIsJoined(true)
    }
    else{
      Swal.fire({
        title: "Error",
        text: Notifications.PLEASE_ENTER_NAME,
        icon: "Error",
        button: "Close",
      })
    }
  }

  return (
    <div className="form">
      <p className="class__title">Join Class Diaglog</p>

      <div className="form__inputs">
        <TextField
          id="displayname"
          label="Display Name (required)"
          className="form__input"
          variant="filled"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <FormControlLabel
            control={<Checkbox color="primary" onChange={() => setIsStudent(!isStudent)} />}
            label="I am student"
        />
        <TextField
          id="studentid"
          label="Student ID (if you are student)"
          className="form__input"
          variant="filled"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          disabled={!isStudent}
        />
        <Button onClick={handleJoinClass} color="primary">
          Join class
        </Button>
      </div>
      
    </div>
  );
};

export default JoinClass;
