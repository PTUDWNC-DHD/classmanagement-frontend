import { Fragment, useState, useContext, useEffect } from 'react'
import { useLocation } from "react-router-dom";

import {Container, Paper, Grid, Tab, Box } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab';

import AuthContext from '../contexts/authContext';
import { getClassroomDetail, getAllClassroomMembers } from '../services/classroomService';

import { Header, ClassroomDetail, MemberList, GradeStructure, GradeTable} from "../components/components";



const ClassroomPage = () => {
  const location = useLocation();
  // get classroomId from path
  const path = location.pathname.split('/')
  const classroomId = path.at(-1);

  const { currentUser } = useContext(AuthContext)

  const [isOwner, setIsOwner] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [classroom, setClassroom] = useState(null);
  const [gradeStructure, setGradeStructure] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  

  //state for display
  const [tab, setTab] = useState('1');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  // do once after render
  useEffect(() => {
    callFetchClassroomDetail();
    callFetchAllClassroomMembers(currentUser.token, classroomId)
  }, [])


  // check if current user is owner
  useEffect(()=>{
    if (classroom) {
      console.log('classroom detail: ', classroom)
      setGradeStructure(classroom.gradeStructure)
      if (classroom.ownerId === currentUser.user._id)
        setIsOwner(true);
    }
  },[classroom, currentUser])


  // check if current user is teacher
  useEffect(()=>{
    for (const teacher of teachers){
      if (teacher._id === currentUser.user._id){
        setIsTeacher(true);
        break;
      }
    }
  },[teachers, currentUser])

  


  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  // call fetch func
  const callFetchClassroomDetail = async () => {
    setIsLoading(true);
    const result = await getClassroomDetail(currentUser.token, classroomId)
    if (result.data) {
      setClassroom(result.data)
    }
    else if (result.error) {
      setErrorMessage(result.error)
    }
    setIsLoading(false);
  }
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

  return (
    <Fragment>
      <Header />
      <Box sx={{ width: '100%', typography: 'body1' }} >
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' , display: 'flex'}} direction="row" justifyContent="center" alignItems="center">
            <TabList onChange={handleChangeTab} >
              <Tab label="Detail" value="1" />
              <Tab label="Members" value="2" />
              <Tab label="Grade Structure" value="3" />
              <Tab label="Grade Table" value="4" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <ClassroomDetail 
              classroomId={classroomId}
              classroom={classroom} 
              gradeStructure={gradeStructure}
              isTeacher={isTeacher}
              isLoading={isLoading} 
              errorMessage={errorMessage}
            />
          </TabPanel>

          <TabPanel value="2">
            <Box sx={{ display: 'flex' }}>
              <Box
                component="main"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[0]
                      : theme.palette.grey[0],
                  flexGrow: 1,
                  height: '100vh',
                  overflow: 'auto',
                }}
              >
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <MemberList teachers={teachers} students={students} />
                      </Paper>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value="3">
            <GradeStructure 
              classroomId={classroomId} 
              gradeStructure={gradeStructure} 
              setGradeStructure={setGradeStructure}
              isTeacher={isTeacher}
            /> 
          </TabPanel>
          <TabPanel value="4">
            <GradeTable 
              currentUser={currentUser} 
              isOwner={isOwner}
              isTeacher={isTeacher} 
              classroomId={classroomId}
              gradeStructure={gradeStructure}
              studentList={students}
            /> 
          </TabPanel>
        </TabContext>
      </Box>
    </Fragment>
  );
}

export default ClassroomPage;