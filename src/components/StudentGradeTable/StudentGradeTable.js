import { useState, useContext, useEffect } from "react";

import { 
  Card,
  Box, 
  Container, 
  Grid,
  Typography, 
} from "@mui/material";


import StudentGrade from "./StudentGrade";

import { getAllStudentGrades } from '../../services/classroomService';


const StudentGradeTable = ({ classroomId, gradeStructure, studentId, studentName, token, isTeacher, userId}) => {
  const [grades, setGrades] = useState('');
  const [finalizedGrades, setFinalizedGrades] = useState([]);
  const [total, setTotal] = useState(0);

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(()=>{
    let totalGrade = 0;
    let totalWeight = 0;
    for (const id in gradeStructure) {
      totalWeight += gradeStructure[id].weight;
    }
    for (const index in finalizedGrades) {
      const gradeId = finalizedGrades[index].structureId;
      const grade = finalizedGrades[index].value;
      let weight = 0;
      for (const id in gradeStructure) {
        if (gradeStructure[id]._id === gradeId) {
          weight = gradeStructure[id].weight;
          break;
        }
      }
      totalGrade += grade * weight / totalWeight;
    }
    
    setTotal(totalGrade)
  },[finalizedGrades])

  useEffect(()=>{
    // get grades of all students in class
    
    if (grades) {
      const newGrades = [];
      for (const index in gradeStructure) {
        if (gradeStructure[index].isFinalized) {
          const id = gradeStructure[index]._id;
          newGrades.push({
            name: gradeStructure[index].name,
            value: grades[id],
            structureId: id
          });
        }
      }
      
      setFinalizedGrades(newGrades)
    }
    
  },[grades])

  useEffect(()=>{
    // get grades of all students in class
    callFetchToGetGrades(token, classroomId)
  },[studentId])

  const callFetchToGetGrades = async (token, classroomId) => {
    setIsLoading(true);
    const result = await getAllStudentGrades(token, classroomId) 
    
    if (result.data) {
      setGrades(result.data[studentId])
    }
    else if (result.error)
      setErrorMessage(result.error)
    setIsLoading(false);
  }


  return (
    <Container maxWidth='sm'>
      <Box sx={{ mb: 10, p: 3}}>
        <Card sx={{ mb: 3, p: 3}}>
          <Grid container spacing={2} sx={{ mb: 3}}>
            <Grid item xs={8}>
              <Typography variant='h5'>{studentName}</Typography>
            </Grid>
            <Grid item xs={4}>
            <Typography variant='h5'>{studentId}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 3}}>
            <Grid item xs={8}>
              <Typography variant='h5'>{'Total grade'}</Typography>
            </Grid>
            <Grid item xs={4}>
            <Typography variant='h5'>{`${total} /10`}</Typography>
            </Grid>
          </Grid>
        </Card>
        {
          finalizedGrades.map((grade, index) => {
            return (
              <StudentGrade
                key={index}
                token={token}
                name={grade.name}
                value={grade.value}
                classroomId={classroomId}
                structureId={grade.structureId}
                studentId={studentId}
                isTeacher={isTeacher}
                userId={userId}
              />
            )
          })
        }
      </Box>
      
      
    </Container>
  );
}

export default StudentGradeTable;