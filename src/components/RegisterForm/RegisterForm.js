import { useFormik } from 'formik'
import * as Yup from 'yup'

import { 
  Avatar, 
  Button, 
  Link, 
  Grid, 
  Box, 
  Container,
  TextField, 
  Typography } from "@mui/material";
import { LockOutlined } from '@mui/icons-material'

import { Copyright } from "../components"

import * as Constant from "../../utils/constant"
import { useEffect } from 'react';

const RegisterForm = ({ handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .required("Required"),
      username: Yup.string()
        .required("Required"),
      email: Yup.string()
        .required("Required")
        .matches(
          Constant.EMAIL_VALIDATE_REGEX,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("Required"),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await handleSubmit(values)
      setSubmitting(false);
    },
  })

  useEffect(()=>{
    console.log('formik values: ', formik.values)
  })

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                autoFocus
                label="Full Name"
                name="fullname"
                autoComplete="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                helperText={formik.touched.fullname && formik.errors.fullname}
                error={formik.touched.fullname && formik.errors.fullname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                helperText={formik.touched.username && formik.errors.username}
                error={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                helperText={formik.touched.email && formik.errors.email}
                error={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                helperText={formik.touched.password && formik.errors.password}
                error={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}> 
              <TextField
                required
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                error={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container> 
  );
}

export default RegisterForm;