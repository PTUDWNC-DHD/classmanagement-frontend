import { useState, useEffect, useContext } from 'react';

import { Container, Stack, Grid, Typography } from '@mui/material'

import AuthContext from '../../context/AuthContext'

import { JoinedClasses } from '../components'

import classes from './style'

const ClassroomList = (props) => {
  const { currentUser, isLoading, isError, fetchClassrooms } = useContext(AuthContext)

  useEffect(() => {
    fetchClassrooms();
  }, [])
  
  if (isError) {
    return <div>Error: {isError.message}</div>;
  } else if (isLoading) {
    return(
      <Typography sx={classes.Loading} variant="h4" align="center">
        Loading....
      </Typography>
    );
  } else {
    return(
      <div>
        <Container>
          <Grid container direction="row" justifyContent="center" alignItems="center" spacing={5}>
            {currentUser.classrooms?.map((classroomItem, index) =>{
              return(
                <Grid sx={classes.GridRow} item key={index}>
                  <JoinedClasses classData={classroomItem}/>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default ClassroomList;