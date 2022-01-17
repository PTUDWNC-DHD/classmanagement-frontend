import { useState, useContext, useEffect } from 'react'
import {  useParams } from "react-router-dom";

import { Paper, Tab, Box } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { Header, ClassroomDetail, MemberList, GradeStructure, GradeTable} from "../components/components";

import { getClassroomDetail, getAllClassroomMembers } from '../services/classroomService';

import AuthContext from '../contexts/authContext';




const ClassroomPage = () => {
  const params = useParams();
  const classroomId = params?.id;

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
    fetchClassroomDetail();
    fetchAllClassroomMembers(currentUser.token, classroomId)
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
  const fetchClassroomDetail = async () => {
    setIsLoading(true);
    const result = await getClassroomDetail(currentUser.token, classroomId)
    if (result.data) {
      console.log('classroom detail: ', result.data)
      setClassroom(result.data)
    }
    else if (result.error) {
      setErrorMessage(result.error)
    }
    setIsLoading(false);
  }
  const fetchAllClassroomMembers = async (token, classroomId) => {
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
    <Paper sx={{ minHeight: '100vh'}}>
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
            <MemberList teachers={teachers} students={students} />
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
            {
              isTeacher ? (
                <GradeTable 
                  currentUser={currentUser} 
                  isOwner={isOwner}
                  isTeacher={isTeacher} 
                  classroomId={classroomId}
                  gradeStructure={gradeStructure}
                  studentList={students}
                /> 
              ) : (
                <div>student view</div>
              )
            }
            
          </TabPanel>
        </TabContext>
      </Box>
    </Paper>
  );
}

export default ClassroomPage;