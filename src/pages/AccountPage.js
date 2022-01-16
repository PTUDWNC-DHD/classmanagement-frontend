import { Fragment } from 'react'
import { useState } from "react";

import {Container, Paper, Grid, Box} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';


import { Header, AccountDetail } from "../components/components";

const AccountPage = (props) => {


  return (
    <ThemeProvider >
    <Paper style={{height:"250vh"}}>
    <Fragment>
      <Header />
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
                <AccountDetail />
                </Paper>
              </Grid>
            </Grid>
            
          </Container>
        </Box>
      
      
    </Fragment>
    </Paper>
  </ThemeProvider>
  )
}

export default AccountPage;