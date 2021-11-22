import { useState, useEffect, useContext } from 'react';

import { Container, Stack, Grid, Typography } from '@mui/material'

import AuthContext from '../../context/AuthContext'

import { JoinedClasses } from '../components'

import classes from './style'

const ClassroomList = (props) => {
  const { currentUser } = useContext(AuthContext)

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [classrooms, setClassrooms] = useState([]);

  const fetchClassrooms = () => {
    setIsLoading(true);
    fetch(process.env.REACT_APP_API_URL + '/api/user/me/classes', { 
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+ currentUser.token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((result) => {
      setClassrooms(result)
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    fetchClassrooms();
  }, [])
  
  if (error) {
    return <div>Error: {error.message}</div>;
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
            {classrooms?.map((classroomItem, index) =>{
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