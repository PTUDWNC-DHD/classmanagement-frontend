import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Avatar, Button, IconButton, TextField } from "@mui/material";
import { Link, Grid, Box, Container, Typography } from "@mui/material";

import { Copyright } from '../components'


const LoginForm = ({ handleLoginByAccount, handleLoginByGoogle}) => {
  const mainLogoSrc = '/images/logo512.png';
  const googleLogoSrc = './images/googleLogo.png';

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Required"),
      password: Yup.string()
        .required("Required")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await handleLoginByAccount(values)
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            autoFocus
            required
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            autoComplete="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            helperText={formik.touched.username && formik.errors.username}
            error={Boolean(formik.touched.username && formik.errors.username)}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            autoComplete="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            helperText={formik.touched.password && formik.errors.password}
            error={Boolean(formik.touched.password && formik.errors.password)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs >
              <Link href="/forgot" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2" >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Typography sx={{ mt: 3 }} variant="subtitle1">
          Or sign in with
        </Typography>
        <IconButton
          onClick={handleLoginByGoogle}
        >
          <Avatar src={googleLogoSrc}  variant="rounded"/>
        </IconButton>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
    </Container>
  );
}

export default LoginForm;
