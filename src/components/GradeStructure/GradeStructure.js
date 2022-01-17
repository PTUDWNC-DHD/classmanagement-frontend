import React , { useState, useEffect, useContext } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Swal from 'sweetalert2'

import { 
  Box,
  Card,
  Button, 
  Typography,
  TextField, 
  Container
} from '@mui/material';
import { AddCircleOutline, DragIndicator, Delete } from '@mui/icons-material';

import { updateGradeStructure } from '../../services/classroomService';

import AuthContext from '../../contexts/authContext'



function GradeStructure({classroomId, gradeStructure, setGradeStructure, isTeacher}) {
  const { currentUser } = useContext(AuthContext)

  const [gradeArray, setGradeArray] = useState(
    gradeStructure.map(grade => {
      return ({
        name: grade.name,
        weight: grade.weight
      })
    }
  ))

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  


  const fetchToSaveGrades = async (token, classroomId, grades) => {
    setIsLoading(true);
    const result = await updateGradeStructure(token, classroomId, grades)
    console.log('result after save: ', result)
    if (result.data)
      setGradeStructure(result.data)
    else if (result.error)
      setErrorMessage(result.error)
    setIsLoading(false);
  }


  function handleSaveGrades(){
    console.log('save grade: ', gradeStructure)
    let isEmpty = false;
    gradeArray.forEach(grade => {
      if (!grade.name || !grade.weight){
        isEmpty = true;
      }
    })
    if (isEmpty) {
      if (gradeArray.length === 1 && !gradeArray[0].name && !gradeArray[0].weight) {
        Swal.fire({
          title: "Warning",
          text: "Are you sure to delete all Grade Structure",
          icon: "warning",
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            fetchToSaveGrades(currentUser.token, classroomId, gradeArray);
            Swal.fire('Success', 'Delete successfully', 'success')
          }
        })
      }
      else {
        Swal.fire({
          title: "Warning",
          text: "Grade Name or Grade Value must not be empty",
          icon: "warning",
          button: "Close",
        }) 
      }
    }
    else {
      fetchToSaveGrades(currentUser.token, classroomId, gradeArray);
      Swal.fire({
        title: "Success",
        text: "Save Grade Structure successfully !",
        icon: "success",
        button: "Close",
      }) 
    }
  }

  function handleAddGrade(){
    setGradeArray(prev => [...prev, {
      name: "",
      weight: ""
    }]);
  }
  
  function handleDeleteGrade(index){
    const newGrades = [...gradeArray]; 
    newGrades.splice(index, 1);
    if (gradeArray.length === 1) {
      newGrades.push({
        name: "",
        weight: ""
      })
    }
    setGradeArray(newGrades)
    
  }
  
  function handleGradeNameChange(index, value){
    const newGrades = [...gradeArray];
    newGrades[index].name = value;
    setGradeArray(newGrades);
  }

  function handleGradeWeightChange(index, value){
    const newGrades = [...gradeArray];
    newGrades[index].weight = value;
    setGradeArray(newGrades);
  }

    
  function onDragEnd(result) {
      if (!result.destination) {
        return;
      }
      var oldArray = [...gradeArray];
      const newGrades = reorder(
        oldArray,
        result.source.index,
        result.destination.index
      );
      setGradeArray(newGrades);
  }
    
  function reorder(list, startIndex, endIndex){
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }
  


  const draggableElement = () => {
    if (gradeArray.length > 0) {
      return (gradeArray.map((grade, index)=> (
        <Draggable key={index} draggableId={index + 'id'} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {/* Drag indicator */}
              <DragIndicator style={{transform: "rotate(-90deg)", color:'#DAE0E2',position:"relative",left:"50%"}} fontSize="small"/>
              {/* Drag content */}
              <Card sx={{ my: 2, p: 2, border: 1, borderColor: 'grey.400' }}>
                <Box 
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box>
                    <TextField
                      required
                      fullWidth
                      margin="normal"
                      label="Grade name"
                      name="name"
                      value={grade.name}
                      onChange={(e)=>{handleGradeNameChange(index, e.target.value)}}
                    />
                    <TextField
                      required
                      fullWidth
                      margin="normal"
                      label="Grade value"
                      name="weight"
                      value={grade.weight}
                      onChange={(e)=>{handleGradeWeightChange(index, e.target.value)}}
                    />
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <Button variant="contained" sx={{ height: '100%', my: 1 }} onClick={(e) => handleAddGrade()}>
                      <AddCircleOutline />
                    </Button>
                    <Button variant="contained" sx={{ height: '100%', my: 1 }} onClick={(e) => handleDeleteGrade(index)}>
                      <Delete />
                    </Button>
                  </Box>
                </Box>
              </Card>
            </div>
          )}
        </Draggable>
      )))
    }
    
  }
  
  if (gradeArray.length < 1) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Typography>No grade structure</Typography>
        {
          isTeacher &&
          <Button variant="contained" sx={{ height: '100%', my: 1 }} onClick={(e) => handleAddGrade()}>
            <AddCircleOutline sx={{ mr: 1}} />Add New Grade Structure
          </Button>
        }
      </Box>
    )
  } else {
    if (isTeacher) {
      return (
        <Container maxWidth='sm' >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                  {draggableElement()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={(e)=>handleSaveGrades()}
          >
            Save
          </Button>
        </Container>
      )
    }
    else {
      return (gradeArray.map((grade, index)=> (
        <Container maxWidth='sm' >
          <Card sx={{ my: 2, p: 2, border: 1, borderColor: 'grey.400' }}>
            <Box 
              sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6"> 
                {grade.name}
              </Typography>
              <Typography> 
              {grade.weight}
              </Typography>
            </Box>
          </Card>
        </Container>
      )))
    }
  }
}


export default GradeStructure;