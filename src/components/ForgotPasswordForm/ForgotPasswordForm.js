import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Avatar, Button } from "@mui/material";
import { Grid, Box, Container, Typography, TextField } from "@mui/material";

import { Copyright } from '../components'

import * as Constant from '../../utils/constant'


const ForgotPasswordForm = ({ handleRequestVerify}) => {
  const mainLogoSrc = '/images/logo512.png';

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
      .required("Required")
      .matches(
        Constant.EMAIL_VALIDATE_REGEX,
        "Please enter a valid email address"
      )
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await handleRequestVerify(values)
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
          alignItems: 'center' 
        }} 
      >
        <Avatar src={mainLogoSrc}  variant="rounded"/>
        <Typography variant="h4">
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            autoFocus
            required
            fullWidth
            margin="normal"
            label="Your Email"
            name="email"
            placeholder="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            helperText={formik.touched.email && formik.errors.email}
            error={Boolean(formik.touched.email && formik.errors.email)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting}
          >
            Submit
          </Button>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
    </Container>
  );
}

export default ForgotPasswordForm;
