import { TextFields } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { Link, Grid, Box, Container, Typography } from "@mui/material";

import { Copyright } from '../components'


const VerifyAccountForm = ({ handleVerify, setCode}) => {
  const mainLogoSrc = '/images/logo512.png';


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
          Verify Account
        </Typography>
        <Box component="form" onSubmit={handleVerify}  sx={{ mt: 1 }}>
          <TextFields
            required
            fullWidth
            label="Verify Code"
            name="code"
            autoComplete="code"
            onChange={(e)=>{setCode(e.target.value)}}
            autoFocus
            color="success"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="success"
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item xs>
              <Link href="/register" variant="body2" >
                Don't receive email? Send again
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
    </Container>
  );
}

export default VerifyAccountForm;
