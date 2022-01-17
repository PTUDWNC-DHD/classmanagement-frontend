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

import { fetchPostReview } from '../../services/reviewService'

import AuthContext from "../../contexts/authContext";
import * as Notifications from '../../utils/notifications'



const ReviewDialog = ({ isOpen, setIsOpen, classId, structureId, studentId, currentGrade }) => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      expectGrade: "",
      reason: ""
    },
    validationSchema: Yup.object({
      expectGrade: Yup.number()
        .required("Required"),
      reason: Yup.string()
      .required("Required")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await handleCreateReview(values)
      setSubmitting(false);
    },
  })

  const handleCreateReview = async (values) => {
    const { expectGrade, reason } = values;
    
    setIsLoading(true);
    const result = await fetchPostReview(currentUser.token, classId, structureId, studentId, currentGrade, expectGrade, reason)
    if (result.data) {
      Swal.fire({
        title: "Success",
        text: Notifications.ADD_REVIEW_SUCCESS,
        icon: "success",
        button: "Close",
      });
    }
    else if (result.error) {
      Swal.fire({
        title: "Error",
        text: Notifications.ADD_REVIEW_FAILED,
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
          {"Add New Review"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your teacher will receive your review
          </DialogContentText>
          <TextField
            autoFocus
            required
            fullWidth
            margin="normal"
            label="Your Expect Grade"
            name="expectGrade"
            type="number"
            value={formik.values.expectGrade}
            onChange={formik.handleChange}
            helperText={formik.touched.expectGrade && formik.errors.expectGrade}
            error={Boolean(formik.touched.expectGrade && formik.errors.expectGrade)}
          />
          <TextField
            autoFocus
            required
            fullWidth
            margin="normal"
            label="Reason"
            name="reason"
            value={formik.values.reason}
            onChange={formik.handleChange}
            helperText={formik.touched.reason && formik.errors.reason}
            error={Boolean(formik.touched.reason && formik.errors.reason)}
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

export default ReviewDialog;
