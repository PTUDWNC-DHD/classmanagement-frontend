import { Avatar, Button, IconButton, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { Link, Grid, Box, Container, Typography } from "@mui/material";


const LoginForm = ({ handleLogin, setUsername, setPassword}) => {
  const mainLogoSrc = '/images/logo512.png';
  const googleLogoSrc = './images/googleLogo.png';

  const Copyright = (props) => {
    return (
      <Typography variant="body2" color="text.primary" align="center" {...props}>
        {'Copyright © DHD TEAM '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

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
        <Box component="form" onSubmit={(e) => {handleLogin(e, 'account')}} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={(e)=>{setUsername(e.target.value)}}
            autoFocus
            color="success"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e)=>{setPassword(e.target.value)}}
            autoComplete="current-password"
            color="success"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
          <Grid container>
            <Grid item xs >
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2" >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Typography sx={{ mt: 3 }} variant="subtitle1">
          Or sign in with
        </Typography>
        <IconButton
          onClick={(e) => {handleLogin(e, 'google')}}
        >
          <Avatar src={googleLogoSrc}  variant="rounded"/>
        </IconButton>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
    </Container>
  );
}

export default LoginForm;
