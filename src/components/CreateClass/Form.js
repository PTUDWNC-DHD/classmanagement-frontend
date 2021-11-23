import React, { useState, useContext } from "react";

import { Button, DialogActions, TextField } from "@mui/material";

import AuthContext from "../../context/AuthContext";



const Form = () => {
  const { currentUser, setCreateClassDialog, fetchClassrooms } = useContext(AuthContext);

  const [className, setClassName] = useState("");

  const handleCreateClass = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_API_URL+'/api/class', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '+ currentUser.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: className,
      })
    })
    .then((res) => res.json())
    .then((result) => {
      if (result.errors) {
        window.alert(`Create class failed: ${result.errors[0]}`);
      } else {
        window.alert('Create class successfully !!!');
      }
      setCreateClassDialog(false);
      fetchClassrooms()
    })
    .catch((error) => {
      console.log('Create class error: ', error)
      setCreateClassDialog(false);
    })
  }

  return (
    <div className="form">
      <p className="class__title">Create Class</p>

      <div className="form__inputs">
        <TextField
          id="filled-basic"
          label="Class Name (required)"
          className="form__input"
          variant="filled"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        
      </div>
      <DialogActions>
        <Button onClick={handleCreateClass} color="primary">
          Create
        </Button>
      </DialogActions>
    </div>
  );
};

export default Form;
