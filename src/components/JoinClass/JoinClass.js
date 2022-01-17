import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import * as Yup from 'yup'


import { Button, Box, Checkbox, FormControlLabel, CardHeader, Card, CardContent, Grid, Divider, TextField } from "@mui/material";





const JoinClass = ({ studentId = "", handleJoinClass, }) => {
  const navigate = useNavigate()
  const [isAccepted, setIsAccepted] = useState(false);

  const formik = useFormik({
    initialValues: {
      studentId: studentId
    },
    validationSchema: Yup.object({
      studentId: Yup.string()
        .required("Required")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await handleJoinClass(values)
      setSubmitting(false);
    },
  })


  const handleCancel = (e) => {
    navigate('/')
  }

  return (
    <Card>
      <CardHeader
        title="Join class Dialog"
        subheader="You are invited to join a classroom"
      />
      <Divider />
      <CardContent>
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
        </CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
          <Button sx={{marginRight: 2}} color="primary" variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={formik.handleSubmit} color="primary" variant="contained" disabled={!isAccepted}>
            Join class
          </Button>  
      </Box>
    </Card>
  );
};

export default JoinClass;
