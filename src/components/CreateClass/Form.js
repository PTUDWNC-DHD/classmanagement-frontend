import React, { useState, useContext } from "react";

import { Button, DialogActions, TextField } from "@mui/material";

import AuthContext from "../../contexts/authContext";
import { createClassroom } from '../../services/classroomService'
import * as Notifications from '../../utils/notifications'

import Swal from 'sweetalert2';



const Form = ({ setIsOpen}) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [className, setClassName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleCreateClass = async (e) => {
    e.preventDefault();
    if (!className){
      window.alert('Please enter class name !!!');
    } else {
      const newClassroom = {
        name: className
      }
      setIsLoading(true);
      const result = await createClassroom(currentUser.token, newClassroom)
      if (result.data) {
        setCurrentUser({...currentUser, 
          classrooms: [...currentUser.classrooms, result.data]
        })
        Swal.fire({
          title: "Success",
          text: Notifications.CREATE_CLASS_SUCCESS,
          icon: "success",
          button: "Close",
        });
      }
      else if (result.error) {
        Swal.fire({
          title: "Error",
          text: Notifications.CREATE_CLASS_FAILED,
          icon: "error",
          button: "Close",
        });
      }
      setIsOpen(false);
      setIsLoading(false);
    }
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
          required
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
