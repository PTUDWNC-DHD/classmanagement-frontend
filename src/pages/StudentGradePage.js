import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import {Container, Paper, Grid, Box} from '@mui/material'

import { Header, StudentGradeTable , LoadingIndicator, ErrorIndicator } from "../components/components";

import { getClassroomDetail, getAllClassroomMembers } from "../services/classroomService";

import AuthContext from "../contexts/authContext";


const StudentGradePage = () => {
  const params = useParams();
  const classroomId = params?.classroomId;
  const userId = params?.studentId;
  const { currentUser } = useContext(AuthContext)

  const [gradeStructure, setGradeStructure] = useState(null);
  const [student, setStudent] = useState({ name: '', id: ''});

  // state for display
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchClassroomDetail();
  }, [])

  useEffect(() => {
    fetchStudentName(currentUser.token, classroomId);
  }, [])

  const fetchClassroomDetail = async () => {
    setIsLoading(true);
    const result = await getClassroomDetail(currentUser.token, classroomId)
    if (result.data) {
      //console.log('classroom detail: ', result.data)
      setGradeStructure(result.data.gradeStructure)
    }
    else if (result.error) {
      console.log('err: ', result.error)
      setHasError(true);
    }
    setIsLoading(false);
  }

  const fetchStudentName = async (token, classroomId) => {
    setIsLoading(true);
    const result = await getAllClassroomMembers(token, classroomId);
    if (result.data) {
      const students = result.data.students;
      for (const index in result.data.students) {
        if (students[index]._id === userId) {
          setStudent({
            name: students[index].name,
            id: students[index].studentId
          })
          break;
        }
      }
    }
    else if (result.error) {
      console.log('fetch student name err: ', result.error)
      setHasError(true)
    }
    setIsLoading(false);
  }

  return (
    <Paper style={{height:"250vh"}}>
      <Header />
      <Box >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              {
                isLoading ? <Container sx={{ display: 'flex', justifyContent:'center', my: 5}}><LoadingIndicator /></Container> :
                hasError ? <Container sx={{ display: 'flex', justifyContent:'center', my: 5}}><ErrorIndicator /></Container> : 
                <StudentGradeTable
                  classroomId={classroomId}
                  gradeStructure={gradeStructure}
                  studentId={student.id}
                  studentName={student.name}
                  token={currentUser.token}
                  isTeacher={true}
                  userId={currentUser.user._id}
                />
              }
              </Paper>
            </Grid>
          </Grid>
          
        </Container>
      </Box>
    </Paper>
  )
}

export default StudentGradePage;