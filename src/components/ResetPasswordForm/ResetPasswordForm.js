import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Grid, Box, Container, Typography, TextField, Avatar, Button } from "@mui/material";
import { LockOutlined } from '@mui/icons-material';

import { Copyright } from '../components'


const ResetPasswordForm = ({ handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
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
          Reset Password
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
                error={Boolean(formik.touched.password && formik.errors.password)}
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
                error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
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
            Change Password
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container> 
  );
}

export default ResetPasswordForm;
