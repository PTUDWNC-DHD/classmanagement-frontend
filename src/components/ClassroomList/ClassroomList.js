import { useEffect, useContext, useState } from 'react';
import { CircularProgress, Container, Grid } from '@mui/material'

import AuthContext from '../../contexts/authContext'
import { getAllClassrooms } from '../../services/classroomService';

import { ClassroomCard } from '../components'

import classes from './style'
import "./ClassroomCard/style.css";

const ClassroomList = (props) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext)

  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const fetchClassrooms = async (token) => {
    setIsLoading(true);
    const result = await getAllClassrooms(token)
    if (result.data) {
      setCurrentUser({...currentUser, classrooms: result.data})
    }
    else if (result.error) {
      setErrorMessage(result.error)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchClassrooms(currentUser.token);
  }, [])
  
  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  } 
  else if (isLoading) {
    return(
      <div className="center-parent">
        <CircularProgress  />
      </div>
    )
  } 
  else {
    return(
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
    )
  }
}

export default ClassroomList;