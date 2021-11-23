import { Fragment, useEffect, useContext, useState } from 'react';

import { Avatar, ListItemAvatar, ListItemText, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import AuthContext from '../../context/AuthContext'

import Title from './Title';



const MemberList = (props) => {
  const { currentUser } = useContext(AuthContext)
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const fetchClassroom = () => {
    setIsLoading(true);
    fetch(process.env.REACT_APP_API_URL + '/api/class/' + props.classroomId + '/users', { 
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+ currentUser.token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((result) => {
      if (result.errors) {
        console.log(result.errors);
        setError(result.errors);
        setIsLoading(false);
      } else {
        setStudents(result.students)
        setTeachers(result.teachers)
        setIsLoading(false);
      }
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    fetchClassroom();
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (isLoading) {
    return(
      <Typography variant="h4" align="center">
        Loading....
      </Typography>
    );
  } else {
    return (
      <Fragment>
        <Title>Teachers</Title>
        <Table size="small">
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.userId}>
                <TableCell><ListItemAvatar><Avatar>T</Avatar></ListItemAvatar></TableCell>
                <TableCell><ListItemText>{teacher.name}</ListItemText></TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Title>Students</Title>
        <Table size="small">
          
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.userId}>
                <TableCell><ListItemAvatar><Avatar>S</Avatar></ListItemAvatar></TableCell>
                <TableCell><ListItemText>{student.name}</ListItemText></TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </Fragment>
    );
  }
}

export default MemberList;