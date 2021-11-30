import { Fragment, useEffect, useContext, useState } from 'react';

import { CircularProgress, Avatar, ListItemAvatar, ListItemText, Table, TableBody, TableCell, TableRow } from "@mui/material";

import AuthContext from '../../context/AuthContext'

import Title from './Title';



const MemberList = (props) => {
  const { currentUser } = useContext(AuthContext)
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
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
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (isLoading) {
    return(
      <div className="center-parent">
      <CircularProgress  />
      </div>
    );
  } else {
    return (
      <Fragment>
        <Title>Teachers</Title>
        <Table size="small" >
          <TableBody>
            {!teachers.length ? <TableRow><TableCell>Class has no teacher</TableCell></TableRow> :
            teachers.map((teacher, index) => (
              <TableRow key={index}>
                <TableCell><ListItemAvatar><Avatar src={'./avatar.jpg'}></Avatar></ListItemAvatar></TableCell>
                <TableCell><ListItemText><h4>{teacher.name}</h4></ListItemText></TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br/><br/>
        <Title>Students</Title>
        <Table size="small">
          
          <TableBody>
            {!students.length ? <TableRow><TableCell>Class has no student</TableCell></TableRow> :
            students.map((student, index) => (
              <TableRow key={index}>
                <TableCell><ListItemAvatar><Avatar src={'./avatar.jpg'}></Avatar></ListItemAvatar></TableCell>
                <TableCell><ListItemText><h4>{student.name}</h4></ListItemText></TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </Fragment>
    );
  }
}

export default MemberList;