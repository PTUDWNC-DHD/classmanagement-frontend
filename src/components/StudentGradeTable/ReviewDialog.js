import React, { useState, useContext, useEffect } from "react";
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
  Box, 
  Typography
} from "@mui/material";

import { fetchPostReview, fetchUpdateGradeToReview } from '../../services/reviewService'

import AuthContext from "../../contexts/authContext";
import * as Notifications from '../../utils/notifications'



const ReviewDialog = ({ isOpen, setIsOpen, classId, structureId, studentId, currentGrade, review , isTeacher}) => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const [changedGrade, setChangedGrade] = useState('');

  useEffect(()=>{
    if (review)
      setChangedGrade(review.expectedGrade)
  },[review])


  const addReviewFormik = useFormik({
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

  const handleChangedGrade = (value) => {
    //console.log('grade');
    setChangedGrade(value)
  }

  const handleUpdateGradeByReview = async () => {
    //setIsLoading(true);
    if (!changedGrade && changedGrade !== 0) {
      Swal.fire({
        title: "Error",
        text: 'Grade must not be empty',
        icon: "error",
        button: "Close",
      });
    }
    else {
      const result = fetchUpdateGradeToReview(currentUser.token, classId, structureId, studentId, changedGrade)
      console.log('result update: ', result)
      if (result){
        Swal.fire({
          title: "Success",
          text: Notifications.UPDATE_ACCOUNT_SUCCESS,
          icon: "success",
          button: "Close",
        });
      }
      else {
        Swal.fire({
          title: "Error",
          text: Notifications.UPDATE_REVIEW_FAILED,
          icon: "error",
          button: "Close",
        });
      }
    }
    setIsOpen(false)
  }

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

  const handleRefuse = () => {
    //console.log('refuse click')
    setIsOpen(false);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const AddDialogContent = (
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {isTeacher ? 'Student review to change grade' : 'Your teacher will receive your review'}
      </DialogContentText>
      <TextField
        autoFocus
        required
        fullWidth
        margin="normal"
        label="Your Expect Grade"
        name="expectGrade"
        type="number"
        value={addReviewFormik.values.expectGrade}
        onChange={addReviewFormik.handleChange}
        helperText={addReviewFormik.touched.expectGrade && addReviewFormik.errors.expectGrade}
        error={Boolean(addReviewFormik.touched.expectGrade && addReviewFormik.errors.expectGrade)}
      />
      <TextField
        autoFocus
        required
        fullWidth
        margin="normal"
        label="Reason"
        name="reason"
        value={addReviewFormik.values.reason}
        onChange={addReviewFormik.handleChange}
        helperText={addReviewFormik.touched.reason && addReviewFormik.errors.reason}
        error={Boolean(addReviewFormik.touched.reason && addReviewFormik.errors.reason)}
      />
      
    </DialogContent>
  )

  const ReviewDialogContent = (
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {isTeacher ? 'Student review to change grade' : 'Your teacher will receive your review'}
      </DialogContentText>
      <Typography>{`Current grade ${currentGrade}`}</Typography>
      <Typography>{`Expect grade ${review.expectedGrade}`}</Typography>
      <TextField
        required
        fullWidth
        margin="normal"
        label="Changed Grade"
        name="changedGrade"
        type="number"
        value={changedGrade}
        onChange={e => handleChangedGrade(e.target.value)}
      />
    </DialogContent>
  )

  const AddDialogActions = (
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button type="submit" 
        onClick={addReviewFormik.handleSubmit} 
        disabled={addReviewFormik.isSubmitting} 
        autoFocus
      >
        Create
      </Button>
    </DialogActions>
  )

  const ReviewDialogActions = (
    <DialogActions>
      <Button onClick={handleRefuse}>Refuse</Button>
      <Button type="submit" 
        onClick={handleUpdateGradeByReview}
      >
        Accept
      </Button>
    </DialogActions>
  )

  return (
    <Box component='form'>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="create-class-dialog-title"
        aria-describedby="create-class-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {isTeacher ? 'Review Grade' : '"Add New Review"'}
        </DialogTitle>
        { isTeacher ? ReviewDialogContent : AddDialogContent}
        { isTeacher ? ReviewDialogActions : AddDialogActions}
        
      </Dialog>
    </Box>
  );
};

export default ReviewDialog;
