import { Fragment } from 'react'

import {Drawer,Container,Paper,Grid,CssBaseline, Tab, Tabs, Box, Typography } from '@mui/material'

import { Header, AccountDetail } from "../components/components";

const AccountPage = (props) => {
  return (
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
  )
}

export default AccountPage;