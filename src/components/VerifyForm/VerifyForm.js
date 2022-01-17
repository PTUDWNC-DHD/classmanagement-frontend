import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Avatar, Button } from "@mui/material";
import { Grid, Box, Container, Typography, TextField } from "@mui/material";

import { Copyright } from '../components'


const VerifyAccountForm = ({ title, handleVerify, handleRequestVerify}) => {
  const mainLogoSrc = '/images/logo512.png';

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .required("Required")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await handleVerify(values)
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
          {title}
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            autoFocus
            required
            fullWidth
            margin="normal"
            label="Verify Code"
            name="code"
            placeholder="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            helperText={formik.touched.code && formik.errors.code}
            error={Boolean(formik.touched.code && formik.errors.code)}
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
          <Grid container justifyContent="flex-end">
            <Grid item xs>
              <Button fullWidth variant="contained" onClick={handleRequestVerify} >
                Don't receive email? Send again
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
    </Container>
  );
}

export default VerifyAccountForm;
