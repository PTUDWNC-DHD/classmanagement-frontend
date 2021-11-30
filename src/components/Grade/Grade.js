import React , { useState } from 'react'

import { IconButton,  Accordion,  AccordionSummary, AccordionDetails, Button, Typography,} from '@mui/material';

import { AddCircleOutline, OndemandVideo, CropOriginal, TextFields, DragIndicator, FilterNone, Delete } from '@mui/icons-material';

//--------------

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";



import "./user_form.css"


function Grade() {
  const [grades, setGrades] =useState([{
    name: "Grade Name",
    value: 0,
    isExpanded: true, 
  }]); 

  function handleSaveGrades(){
    console.log("call API for saving new grades");
  
  }
  
  function handleAddGrade(){
    closeAllExpandedGrades();

    setGrades(grades => [...grades, {
      name: "New Grade Name",
      value: 0,
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
    if(newGrades.length > 1){
      newGrades.splice(index, 1);
    }
    setGrades(newGrades)
  }
  
  function handleGradeValueChange(index, value){
    const newGrades = [...grades];
    newGrades[index].value = value;
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
    
  const reorder = (list, startIndex, endIndex) => {
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

  function handleExpand(index){
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
        elevation={1} style={{width:'100%'}}
      >
        { !grade.isExpanded && (     
          <div className="saved_questions">
            <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px"}} >
              {index + 1}. {grade.name}
            </Typography>
            <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px"}} >
              {grade.value}
            </Typography>
          </div>            
        )}   
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
                  onChange={()=>{handleExpand(i)}} 
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
                          <input type="number" className="diem" placeholder="Điểm" value={grade.value} onChange={(e)=>{handleGradeValueChange(i, e.target.value)}}></input>
                        </div>
                        <div className="add_footer">
                        
                        </div>
                      </div>
                    </AccordionDetails>

                    <div className="question_edit">
                      <AddCircleOutline className="edit" onClick={(e)=>handleAddGrade()} />
                      <FilterNone className="edit" onClick={(e)=>{handleCopyGrade(i)}} />
                      <Delete className="edit" onClick={(e)=>{handleDeleteGrade(i)}} />
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


export default Grade;