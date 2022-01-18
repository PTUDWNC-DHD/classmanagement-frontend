import React, { useState, useContext } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2';

import { 
  Box, 
  DialogTitle, 
  DialogContentText, 
  Button, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent,
  FormControlLabel,
  Checkbox
} from "@mui/material";


import { sendInvitation } from "../../services/inviteService";

import AuthContext from "../../contexts/authContext";
import * as Notifications from "../../utils/notifications"
import * as Constant from "../../utils/constant"


const InvitePopup = ({ showInvitePopup, setShowInvitePopup, classroomId }) => {
  const { currentUser } = useContext(AuthContext);
  const [isStudent, setIsStudent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .matches(
          Constant.EMAIL_VALIDATE_REGEX,
          "Please enter a valid email address"
        ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await handleSendInvitation(values)
      setSubmitting(false);
    },
  })

  const handleSendInvitation = async (values) => {
    const { email } = values;
    const result = await sendInvitation(currentUser.token, [email], classroomId, true, isStudent)
    if (result.data) {
      Swal.fire({
        title: "Success",
        text: Notifications.SEND_INVITATION_SUCCESS,
        icon: "success",
        button: "Close",
      })
    }
    else if (result.error) {
      Swal.fire({
        title: "Error",
        text: Notifications.SEND_INVITATION_FAILED,
        icon: "error",
        button: "Close",
      });
    }
    setShowInvitePopup(false)
  }

  const handleClose = () => {
    setShowInvitePopup(false);
  }

  return (
    <Box component='form'>
      <Dialog
        open={showInvitePopup}
        onClose={handleClose}
        aria-labelledby="create-class-dialog-title"
        aria-describedby="create-class-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Invite to classroom"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will send an email for invitation
          </DialogContentText>
          <TextField
            autoFocus
            required
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            helperText={formik.touched.email && formik.errors.email}
            error={Boolean(formik.touched.email && formik.errors.email)}
          />
          <FormControlLabel
          control={<Checkbox color="primary" onChange={() => setIsStudent(!isStudent)} />}
          label="Is student"
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={formik.handleSubmit} disabled={formik.isSubmitting} autoFocus>
            Send Invitation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
};

export default InvitePopup;
