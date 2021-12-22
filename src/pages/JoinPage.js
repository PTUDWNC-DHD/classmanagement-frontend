import { Fragment } from 'react'
import { useLocation } from "react-router-dom";
import { Container, Paper, Grid, Box} from '@mui/material'
import { JoinClass } from "../components/components";

const JoinPage = (props) => {
  const location = useLocation();
  
  const path = location.pathname.split('/')
  const type = path.at(-1)
  const joinCode = path.at(-2)
  
  return (
    <Fragment>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <JoinClass joinCode={joinCode} type ={type}/>
              </Paper>
            </Grid>
          </Grid>
          
        </Container>
      </Box>
    </Fragment>
  )
}

export default JoinPage;