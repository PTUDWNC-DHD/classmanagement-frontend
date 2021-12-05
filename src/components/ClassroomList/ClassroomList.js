import { useEffect, useContext } from 'react';

import { CircularProgress, Container, Grid } from '@mui/material'

import AuthContext from '../../context/AuthContext'

import { ClassroomCard } from '../components'

import classes from './style'

import "./ClassroomCard/style.css";

const ClassroomList = (props) => {
  const { currentUser, isLoading, errorMessage, fetchClassrooms } = useContext(AuthContext)

  useEffect(() => {
    fetchClassrooms();
  }, [])
  
  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  } else if (isLoading) {
    return(
      <div className="center-parent">
      <CircularProgress  />
      </div>
    );
  } else {
    return(
      <div>
        <Container>
          <Grid container direction="row" justifyContent="center" alignItems="center" spacing={5}>
            {currentUser.classrooms?.map((classroomItem, index) =>{
              return(
                <Grid sx={classes.GridRow} item key={index}>
                  <ClassroomCard classData={classroomItem}/>
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