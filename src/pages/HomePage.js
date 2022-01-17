import { useEffect, useContext, useState } from 'react';

import { Paper, Container } from "@mui/material"

import { Header, ClassroomList, LoadingIndicator, ErrorIndicator } from "../components/components";

import { getAllClassrooms } from '../services/classroomService';

import AuthContext from '../contexts/authContext'



const HomePage = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchClassrooms(currentUser.token);
  }, [])


  const fetchClassrooms = async (token) => {
    setIsLoading(true);
    const result = await getAllClassrooms(token)
    if (result.data) {
      setCurrentUser({...currentUser, classrooms: result.data})
    }
    else if (result.error) {
      setHasError(true)
    }
    setIsLoading(false);
  }



  return (
    <Paper sx={{ height: '100vh'}}>
      <Header />
      {
        isLoading ? <Container sx={{ display: 'flex', justifyContent:'center', my: 5}}><LoadingIndicator /></Container> :
        hasError ? <ErrorIndicator sx={{ display: 'flex', justifyContent:'center', my: 5}}/> : <ClassroomList classrooms={currentUser.classrooms} />
      }
      
    </Paper>
  );
  
}

export default HomePage;