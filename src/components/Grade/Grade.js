import React , { useState, useEffect, useContext } from 'react'

import { Accordion,  AccordionSummary, AccordionDetails, Button, Typography, CircularProgress, IconButton} from '@mui/material';

import { AddCircleOutline, DragIndicator, FilterNone, Delete } from '@mui/icons-material';

import AuthContext from '../../contexts/authContext'
import { getClassroomDetail, updateGradeStructure } from '../../api/classroom';

//--------------

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";



import "./user_form.css"



function Grade(props) {
  const { currentUser } = useContext(AuthContext)

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [grades, setGrades] =useState([]); 


  const callFetchClassroomDetail = async (token, classroomId) => {
    setIsLoading(true);
    const result = await getClassroomDetail(token, classroomId)
    if (result.data) {
      addIsExpandAndSetGrades(result.data.gradeStructure)
    }
    else if (result.error) {
      setErrorMessage(result.error)
    }
    setIsLoading(false);
  }

  const fetchToSaveGrades = async (token, classroomId, grades) => {
    setIsLoading(true);
    const result = await updateGradeStructure(token, classroomId, grades)
    if (result.data)
      addIsExpandAndSetGrades(result.gradeStructure)
    else if (result.error)
      setErrorMessage(result.error)
    setIsLoading(false);
  }

  useEffect(() => {
    callFetchClassroomDetail(currentUser.token, props.classroomId);
    //console.log('class grade detail:', grades)
  }, [])

  function addIsExpandAndSetGrades(gradesArr){
    const newGrades = [];
    gradesArr.forEach(grade => {
      newGrades.push({...grade, isExpanded: false})
    })
    setGrades(newGrades)
  }

  function handleSaveGrades(){
    let isEmpty = false;
    grades.forEach(grade => {
      if (!grade.name || !grade.weight){
        isEmpty = true;
      }
    })
    isEmpty ? window.alert("Name or grade must not be empty") : fetchToSaveGrades(currentUser.token, props.classroomId, grades);
  }

  function handleAddGrade(){
    closeAllExpandedGrades();

    setGrades([...grades, {
      name: "",
      weight: "",
      isExpanded: true, 
    }]);
  }
  
  function handleCopyGrade(index){
    closeAllExpandedGrades()
    
    const newGrades = [...grades];
    const copyGrade = {...grades[index]}
    newGrades.splice(index, 0, copyGrade);
    setGrades(newGrades)
  }
    
  function handleDeleteGrade(index){
    const newGrades = [...grades]; 
    newGrades.splice(index, 1);
    setGrades(newGrades)
  }
  
  function handleGradeWeightChange(index, value){
    const newGrades = [...grades];
    newGrades[index].weight = value;
    setGrades(newGrades);
  }

  function handleGradeNameChange(index, value){
    const newGrades = [...grades];
    newGrades[index].name = value;
    setGrades(newGrades);
  }
    
  function onDragEnd(result) {
      if (!result.destination) {
        return;
      }
      var oldGrades = [...grades];
      const newGrades = reorder(
        oldGrades,
        result.source.index,
        result.destination.index
      );
      setGrades(newGrades);
  }
    
  function reorder(list, startIndex, endIndex){
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }
  
  function closeAllExpandedGrades(){
    let newGrades = [...grades]; 
    for (let i = 0; i < newGrades.length; i++) {  
      newGrades[i].isExpanded = false;
    }
    setGrades(newGrades);
  }

  function openExpand(index){
    const newGrades = [...grades];
    for (let j = 0; j < newGrades.length; j++) {
      j === index ? newGrades[j].isExpanded = true : newGrades[j].isExpanded = false;
    }
    setGrades(newGrades);
  }

  const gradeSummary = (grade, index) => {
    return (
      <AccordionSummary            
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{width:'100%'}}
      >
        
        <div className="summary_wrapper">
          <div className="grade_label">Grade {index + 1}</div>
          {!grade.isExpanded && 
            <div className="saved_questions">
              <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',padding:"0 0 8px 24px"}} >
                {grade.name ? grade.name : "No name"}
              </Typography>
              <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',padding:"0 0 8px 24px"}} >
                {grade.weight ? grade.weight : "No grade"}
              </Typography>
            </div>
          }
        </div> 
      </AccordionSummary>
    )
  }
    
  function gradesUI(){
    return (grades.map((grade, i)=> (
      <Draggable key={i} draggableId={i + 'id'} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div style={{marginBottom: "0px"}}>
                {/* DragIndicator */}
                <div style={{width:'100%', marginBottom: '0px' }}>
                  <DragIndicator style={{transform: "rotate(-90deg)", color:'#DAE0E2',position:"relative",left:"300px"}} fontSize="small"/>
                </div>
                {/* Drag content */}
                <Accordion 
                  className={grade.isExpanded ? 'add_border' : ""}
                  onChange={()=>{openExpand(i)}} 
                  expanded={grade.isExpanded}
                >

                  {gradeSummary(grade, i)}

                  <div className="question_boxes">
                    <AccordionDetails className="add_question" >
                      <div >
                        <div className="add_question_top">
                            <input type="text" className="question" placeholder="Tên" value={grade.name} onChange={(e)=>{handleGradeNameChange(i, e.target.value)}}></input>         
                        </div>
                        <div >
                          <input type="number" className="diem" placeholder="Điểm" value={grade.weight} onChange={(e)=>{handleGradeWeightChange(i, e.target.value)}}></input>
                        </div>
                        <div className="add_footer">
                        
                        </div>
                      </div>
                    </AccordionDetails>

                    <div className="question_edit">
                      <IconButton onClick={(e)=>handleAddGrade()}>
                        <AddCircleOutline className="edit"  />
                      </IconButton>
                      <IconButton onClick={(e)=>{handleCopyGrade(i)}}>
                        <FilterNone className="edit"  />
                      </IconButton>
                      <IconButton onClick={(e)=>{handleDeleteGrade(i)}}>
                        <Delete className="edit"  />
                      </IconButton>
                    </div>
                  </div>
                </Accordion>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    )))
  }
  
  if (errorMessage) {
    return <div>Error: errorMessage</div>;
  } else if (isLoading) {
    return(
      <div className="center-parent">
        <CircularProgress  />
      </div>
    );
  } else if (grades.length < 1) {
    return (
      <div className="nograde_announce">
        <p>No grade structure</p>
        <IconButton onClick={(e)=>handleAddGrade()}>
          <AddCircleOutline className="edit"/>
        </IconButton>
      </div>
    )
  } else {
    return (
      <div >
        <div className="question_form">
          <br/>
          <div className="section">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                  >
                    {gradesUI()}

                    {provided.placeholder}
                  </div>
                )} 
              </Droppable>
            </DragDropContext>
            <div className="save_form">
              <Button 
                variant="contained" 
                color="primary"  
                style={{fontSize:"14px"}}
                onClick={(e)=>handleSaveGrades()}
              >Save</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Grade;