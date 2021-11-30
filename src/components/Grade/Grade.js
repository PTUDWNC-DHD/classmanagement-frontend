import React , { useState, useEffect, useContext } from 'react'

import { Accordion,  AccordionSummary, AccordionDetails, Button, Typography, CircularProgress, IconButton} from '@mui/material';

import { AddCircleOutline, DragIndicator, FilterNone, Delete } from '@mui/icons-material';

import AuthContext from '../../context/AuthContext'

//--------------

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";



import "./user_form.css"



function Grade(props) {
  const { currentUser } = useContext(AuthContext)

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [grades, setGrades] =useState([]); 

  const fetchToGetGrades = () => {
    setIsLoading(true);
    fetch(process.env.REACT_APP_API_URL + '/api/class/' + props.classroomId, { 
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+ currentUser.token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((result) => {
      
      setGrades(result.gradeStructure)
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    })
  }

  const fetchToSaveGrades = () => {
    setIsLoading(true);
    const data = [];
    grades.forEach(element => {
      data.push({
        name: element.name,
        weight: parseInt(element.value)
      })
    });
    fetch(process.env.REACT_APP_API_URL + '/api/class/' + props.classroomId, { 
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer '+ currentUser.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gradeStructure: data
      })
    })
    .then(res => res.json())
    .then((result) => {
      setGrades(result.gradeStructure)
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    fetchToGetGrades();
    console.log('class grade detail:', grades)
  }, [])

  function handleSaveGrades(){
    fetchToSaveGrades();
  }

  function handleAddGrade(){
    closeAllExpandedGrades();

    setGrades(grades => [...grades, {
      name: "",
      value: "",
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
    console.log('new grade: ', newGrades);
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
          <div className="summary_wrapper">
            <div className="saved_questions">
              <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',padding:"0 0 0 8px"}} >
                {index + 1}. {grade.name ? grade.name : "No name"}
              </Typography>
              <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',padding:"0 0 8px 24px"}} >
                {grade.value ? grade.value : "No grade"}
              </Typography>
            </div>
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
  
  if (error) {
    return <div>Error: {error.message}</div>;
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