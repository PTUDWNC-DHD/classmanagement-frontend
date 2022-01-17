import React, { useState, useContext } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2';

import { 
  Button, 
  Dialog, 
  DialogTitle,
  DialogContentText,
  DialogActions, 
  DialogContent,
  TextField,
  Box 
} from "@mui/material";

import { createClassroom } from '../../services/classroomService'

import AuthContext from "../../contexts/authContext";
import * as Notifications from '../../utils/notifications'



const CreateClass = ({ isOpen, setIsOpen }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      classname: ""
    },
    validationSchema: Yup.object({
      classname: Yup.string()
        .required("Required")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await handleCreateClass(values)
      setSubmitting(false);
    },
  })

  const handleCreateClass = async (values) => {
    const { classname } = values;
    const newClassroom = {
      name: classname
    }
    setIsLoading(true);
    const result = await createClassroom(currentUser.token, newClassroom)
    if (result.data) {
      setCurrentUser(prev => ({...prev, 
        classrooms: [...prev.classrooms, result.data]
      }))
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
    handleClose();
    setIsLoading(false);
  }

  const handleClose = () => {
    setIsOpen(false);
  }


  return (
    <Box component='form'>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="create-class-dialog-title"
        aria-describedby="create-class-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create new classroom"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will be the teacher of this class
          </DialogContentText>
          <TextField
            autoFocus
            required
            fullWidth
            margin="normal"
            label="Class Name"
            name="classname"
            value={formik.values.classname}
            onChange={formik.handleChange}
            helperText={formik.touched.classname && formik.errors.classname}
            error={Boolean(formik.touched.classname && formik.errors.classname)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={formik.handleSubmit} disabled={formik.isSubmitting} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateClass;
