import {Container, Stack, Grid, Typography} from '@mui/material'


import {useState, useEffect } from 'react';
import ClassroomCard from './ClassroomCard/ClassroomCard'
import AddClassroomPopup from '../AddClassroomPopup/AddClassroomPopup'

import classes from './style'

const ClassroomList = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [classrooms, setClassrooms] = useState([]);

  const FetchClassrooms = () => {
    setIsLoaded(false);
    fetch(process.env.REACT_APP_API_URL + '/classrooms')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setClassrooms(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(() => {
    FetchClassrooms();
  }, [])
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return(
      <Typography sx={classes.Loading} variant="h4" align="center">
        Loading....
      </Typography>
    );
  } else {
    return(
      <div>
        <Stack direction="row" justifyContent="center" alignItems="space-between" spacing={0}>
          <p>Create classroom</p>
          <AddClassroomPopup fetch={FetchClassrooms} />
        </Stack>
        
        <Container>
          <Grid container direction="row" justifyContent="center" alignItems="center" spacing={5}>
            {classrooms?.map((classroomItem, index) =>{
              return(
                <Grid sx={classes.GridRow} item key={index}>
                  <ClassroomCard data={classroomItem}/>
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