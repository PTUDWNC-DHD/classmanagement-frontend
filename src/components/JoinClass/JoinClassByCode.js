import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

import { 
  Button, 
  Dialog, 
  DialogTitle,
  DialogContentText,
  DialogActions, 
  DialogContent,
  TextField,
  Box,
  FormControlLabel,
  Checkbox
} from "@mui/material";

import { updateAndGetNewUserDetail } from "../../services/userService"
import { joinClassroom } from "../../services/joinService";

import AuthContext from "../../contexts/authContext";

import * as Notifications from "../../utils/notifications"
import * as Constant from "../../utils/constant"
import { saveToLocalStorage } from '../../utils/localStorage'


const JoinClassByCode = ({ isOpen, setIsOpen, studentId=""  }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isAccepted, setIsAccepted] = useState(false);

  const formik = useFormik({
    initialValues: {
      code: "",
      studentId: studentId
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .required("Required"),
      studentId: Yup.string()
        .required("Required")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await handleJoinClass(values)
      setSubmitting(false);
    },
  })

  const handleJoinClass = async (values) => {
    const { code } = values;
    const newToken = await handleSaveDetail(values);
    if (newToken) {
      const result = await joinClassroom(newToken, code, "public")
      if (result.data) {
        Swal.fire({
          title: "Success",
          text: Notifications.JOIN_CLASS_SUCCESS,
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
    }
    
    setIsOpen(false);
  }
  
  const handleSaveDetail = async (values) => {
    const { studentId } = values;
    
    const result = await updateAndGetNewUserDetail(currentUser.token, {studentId: studentId})
    if (result.data) {
      setCurrentUser(result.data)
      saveToLocalStorage(result.data, Constant.LOCAL_STORAGE_USER)
      return result.data.token;
    }
    else if (result.error) {
      console.log('update student id err: ', result.error)
    }
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
          {"Join classroom"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will be the student of this class
          </DialogContentText>
          <TextField
            required
            fullWidth
            margin="normal"
            label="Class code"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            helperText={formik.touched.code && formik.errors.code}
            error={Boolean(formik.touched.code && formik.errors.code)}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            label="Student ID"
            name="studentId"
            value={formik.values.studentId}
            onChange={formik.handleChange}
            helperText={formik.touched.studentId && formik.errors.studentId}
            error={Boolean(formik.touched.studentId && formik.errors.studentId)}
            disabled={Boolean(studentId)}
          />
        <FormControlLabel
          control={<Checkbox color="primary" onChange={() => setIsAccepted(!isAccepted)} />}
          label= {
            Boolean(studentId) ? "I accept to join class"
            : "I accept to update my student ID (it can not be changed in the future)"
          }
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={formik.handleSubmit} disabled={formik.isSubmitting} autoFocus>
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JoinClassByCode;
