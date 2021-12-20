import { Fragment, useEffect, useContext, useState } from 'react';

import { CircularProgress, Avatar, ListItemAvatar, ListItemText, Table, TableBody, TableCell, TableRow } from "@mui/material";

import AuthContext from '../../contexts/authContext'
import { getAllClassroomMembers } from '../../services/classroomService';

import Title from './Title';



const MemberList = (props) => {
  const { currentUser } = useContext(AuthContext)
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const callFetchAllClassroomMembers = async (token, classroomId) => {
    setIsLoading(true);
    const result = await getAllClassroomMembers(token, classroomId);
    if (result.data) {
      //console.log('result: ', result)
      setStudents(result.data.students)
      setTeachers(result.data.teachers)
    }
    else if (result.error) {
      setErrorMessage(result.error)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    callFetchAllClassroomMembers(currentUser.token, props.classroomId)
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