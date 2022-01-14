import { Avatar, Button } from "@mui/material";
import { Link, Grid, Box, Container, Typography, TextField } from "@mui/material";

import { Copyright } from '../components'


const VerifyAccountForm = ({ handleVerify, handleRequestVerify, setCode}) => {
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
        <Box component="form" onSubmit={handleVerify}  sx={{ mt: 2 }}>
          <TextField
            required
            fullWidth
            label="Verify Code"
            name="code"
            placeholder="code"
            onChange={(e)=>{setCode(e.target.value)}}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
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
