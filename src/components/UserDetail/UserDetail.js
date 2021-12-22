import { Fragment } from 'react';
import { useNavigate } from "react-router-dom";

import { Box, Button, Card, CardContent, Divider, Grid, TextField, Avatar, Typography } from '@mui/material';



const UserDetail = ({name, studentId, email}) => {
  const navigate = useNavigate();
  

  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <Fragment >
      <Card >
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar>{name?.charAt(0)}</Avatar>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              {name}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardContent>
          <Grid container spacing={3} >
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                disabled
                value={email}
                variant="filled"
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="Student ID"
                name="studentId"
                disabled
                value={studentId}
                variant="filled"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained" onClick={handleGoBack}>
            Back to Classroom
          </Button>
        </Box>
      </Card>
    </Fragment>
  );
};

export default UserDetail;