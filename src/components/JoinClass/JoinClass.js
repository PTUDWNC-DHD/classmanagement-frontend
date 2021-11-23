import React, { useState, useContext } from "react";

import { Button, DialogActions, TextField, Checkbox } from "@mui/material";

import AuthContext from "../../context/AuthContext";

import "./style.css";

const JoinClass = (props) => {
  const { currentUser, setIsJoined, fetchClassrooms } = useContext(AuthContext);

  const [displayName, setDisplayName] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [studentId, setStudentId] = useState('');

  const handleJoinClass = (e) => {
    e.preventDefault();
    if (displayName){
      fetch(process.env.REACT_APP_API_URL+'/api/join/' + props.joinCode, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+ currentUser.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: displayName,
          code: studentId,
          isStudent: isStudent
        })
      })
      .then((res) => res.json())
      .then((result) => {
        if (result.errors) {
          window.alert(`Join class failed: ${result.errors[0]}`);
        } else {
          window.alert('Join class successfully !!!');
        }
        setIsJoined(true);
        fetchClassrooms()
      })
      .catch((error) => {
        console.log('Join class error: ', error)
        window.alert(`Join class failed: ${error}`);
        setIsJoined(true);
      })
    }
    else{
      window.alert('Please enter your display name in class !!!');
    }
  }

  return (
    <div className="form">
      <p className="class__title">Join Class</p>

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
        <div className="class__checkboxWrapper">
          <Checkbox color="primary" onChange={() => setIsStudent(!isStudent)} />
          <p>
            I am student
          </p>
        </div>
        <TextField
          id="studentid"
          label="Student ID (if you are student)"
          className="form__input"
          variant="filled"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          disabled={!isStudent}
        />
      </div>
      <DialogActions>
        <Button onClick={handleJoinClass} color="primary">
          Join class
        </Button>
      </DialogActions>
    </div>
  );
};

export default JoinClass;
