import React ,{useState,useEffect} from 'react'
import {FormControlLabel} from '@material-ui/core'
import { 
    Box,
    Form,
    FormControllLabel, 
    IconButton, 
    Accordion, 
    AccordionSummary,
    AccordionDetails,
    AccordionActions, 
    Select, 
    Switch,
    MenuItem,
    Radio,
    Checkbox,
    Grid,
    Paper,
    TextField,
    Button,
    Divider,
    Typography,} from '@mui/material';

import {AddCircleOutline,
        OndemandVideo,
        CropOriginal,
        TextFields,
        DragIndicator,
        Subject,
        CheckBox,
        ShortText,
        Close,
        FilterNone,
        MoreVert,
        } from '@mui/icons-material';

import makeStyles from '@mui/styles';
//--------------

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {BsTrash} from "react-icons/bs"





// ------------------------------------------


import {BsFileText} from "react-icons/bs"
import {FcRightUp} from "react-icons/fc"







import { useStateValue } from './StateProvider'

import { useParams } from "react-router";
//------------

import { useHistory } from 'react-router-dom';


import "./user_form.css"


import axios from "axios"
import { fontWeight } from '@mui/system';
function Grade() {
    
    const [questions,setQuestions] =useState([]); 
    const [documentName,setDocName] =useState("untitled Document"); 

    const [documentDescription,setDocDesc] =useState("Add Description"); 

    const [questionType,setType] =useState("text");
    const [questionRequired,setRequired] =useState("true"); 
    let { id } = useParams();
    
    console.log(id)
    useEffect(()=>{
        var newQuestion = {questionText: "Question",answer:false,answerKey:"",questionType:"radio", options : [{optionText: "0"}], open: true, required:false}

           setQuestions([...questions, newQuestion])
      
    },[])
 
   

    function changeType(e){
      // dispatch({
      //   type:"CHANGE_TYPE",
      //   questionType:e.target.id
      // })
      setType(e.target.id)

    }


    useEffect(()=>{
      setType(questionType)
     },[changeType])
   
    function saveQuestions(){
        console.log("auto saving questions initiated");
        var data = {
          formId: "1256",
          name: "My-new_file",
          description: "first file",
          questions: questions
        }
    
        setQuestions(questions)
        
      }

      

      
    
    
      function addMoreQuestionField(){
          expandCloseAll(); //I AM GOD
    
          setQuestions(questions=> [...questions, {questionText: "Tên", questionType:"radio", options : [{optionText: "0"}], open: true, required:false}]);
      }

      function addQuestionType(i,type){
        let qs = [...questions];  
        console.log(type)
        qs[i].questionType = type;
        
        setQuestions(qs);
        
      }
    
  
    function copyQuestion(i){
      expandCloseAll()
      let qs = [...questions]
      var newQuestion = qs[i]

      setQuestions([...questions, newQuestion])

    }
    
      function deleteQuestion(i){
        let qs = [...questions]; 
        if(questions.length > 1){
          qs.splice(i, 1);
        }
        setQuestions(qs)
      }
      
      function handleOptionValue(text,i, j){
        var optionsOfQuestion = [...questions];
        optionsOfQuestion[i].options[j].optionText = text;
        //newMembersEmail[i]= email;
        setQuestions(optionsOfQuestion);
      }
    
      function handleQuestionValue(text, i){
        var optionsOfQuestion = [...questions];
        optionsOfQuestion[i].questionText = text;
        setQuestions(optionsOfQuestion);
      }
    
      function onDragEnd(result) {
          if (!result.destination) {
            return;
          }
          var itemgg = [...questions];
          const itemF = reorder(
            itemgg,
            result.source.index,
            result.destination.index
          );
          setQuestions(itemF);
      }
    
      const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
      };

      
    
      function setOptionAnswer(ans,qno){
        var Questions = [...questions];
  
          Questions[qno].answer = ans;
        

        setQuestions(Questions)
        console.log(qno+" "+ans)
      }

      function setOptionPoints(points,qno){
        var Questions = [...questions];
  
          Questions[qno].points = points;
        

        setQuestions(Questions)
        console.log(qno+" "+points)
      }
      
    
      function doneAnswer(i){
        var answerOfQuestion = [...questions];
        
          answerOfQuestion[i].answer= !answerOfQuestion[i].answer;
        
        setQuestions(answerOfQuestion)
      }

      function requiredQuestion(i){
        var requiredQuestion = [...questions];
      
          requiredQuestion[i].required =  ! requiredQuestion[i].required
        
        console.log( requiredQuestion[i].required+" "+i);
        setQuestions(requiredQuestion)
      }
    

      
    
      function expandCloseAll(){
        let qs = [...questions]; 
         for (let j = 0; j < qs.length; j++) {  
          qs[j].open = false;
         }
         setQuestions(qs);
      }
    
      function handleExpand(i){
        let qs = [...questions]; 
        for (let j = 0; j < qs.length; j++) {
          if(i ===j ){
            qs[i].open = true;
     
          } else{
            qs[j].open = false;
           }
        }
         setQuestions(qs);
      }
    
      function questionsUI(){
        return  questions.map((ques, i)=> (
          <Draggable key={i} draggableId={i + 'id'} index={i}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div>
              <div style={{marginBottom: "0px"}}>
                <div style={{width:'100%', marginBottom: '0px' }}>
                  <DragIndicator style={{transform: "rotate(-90deg)", color:'#DAE0E2',position:"relative",left:"300px"}} fontSize="small"/>
                </div>
              {/**/}
                <Accordion onChange={()=>{handleExpand(i)}} expanded={questions[i].open} 
                    className={questions[i].open ? 'add_border' : ""} >
                  <AccordionSummary            
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    elevation={1} style={{width:'100%'}}
                  >
                    { !questions[i].open ? (     
                  <div className="saved_questions">
                    <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px"}} >{i+1}.  {ques.questionText}</Typography>
                    {ques.options.map((op, j)=>(
                     <div key={j} >
                       <div style={{display: 'flex',}}>
                        <FormControlLabel style={{marginLeft:"5px",marginBottom:"5px"}} disabled control={<input type={ques.questionType} color="primary" style={{marginRight: '3px', }} required={ques.type}/>} label={
                            <Typography style={{fontFamily:' Roboto,Arial,sans-serif',
                                fontSize:' 13px',
                                fontWeight: '400',
                                letterSpacing: '.2px',
                                lineHeight: '20px',
                                color: '#202124'}}>
                              {ques.options[j].optionText}
                            </Typography>
                          } />
                       </div>
                     </div>
                    ))}  
                  </div>            
                  ): ""}   
                  </AccordionSummary>
                      <div className="question_boxes">
                      {!ques.answer ? (<AccordionDetails className="add_question" >
                         
                        <div >
                            <div className="add_question_top">
                                <input type="text" className="question" placeholder="Tên"    value={ques.questionText} onChange={(e)=>{handleQuestionValue(e.target.value, i)}}></input>         
                            </div>
                            {ques.options.map((op, j)=>(
                                <div className="add_question_body" key={j}>
                                    <div >
                                        <input type="number" className="diem" placeholder="điểm"  value={ques.options[j].optionText}onChange={(e)=>{handleOptionValue(e.target.value, i, j)}}></input>
                                    </div>
                                </div>   
                            ))}  
                               <div className="add_footer">
                                <div className="add_question_bottom">
                                    <IconButton aria-label="Copy" onClick={()=>{copyQuestion(i)}}>
                                        <FilterNone/>
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={()=>{deleteQuestion(i)}}>
                                        <BsTrash />
                                    </IconButton>
                                        <span style={{color:"#5f6368",fontSize:"13px"}}>Required </span> <Switch name="checkedA" color="primary" checked={ques.required} onClick={()=>{requiredQuestion(i)}}/>
                                    <IconButton>
                                        <MoreVert />
                                    </IconButton>
                                </div>
                              </div>
                            </div>
                            
                    </AccordionDetails>):(
                      <AccordionDetails className="add_question" >
                         <div className="top_header">
                              Choose Correct Answer
                         </div>
                          <div >
                              <div className="add_question_top">
                                  <input type="text" className="question " placeholder="Question"    value={ques.questionText} onChange={(e)=>{handleQuestionValue(e.target.value, i)}} disabled/>
                                  <input type="number" className="points" min="0" step="1" placeholder="0" onChange={(e)=>{setOptionPoints(e.target.value, i)}} />        
                              </div>
                              {ques.options.map((op, j)=>(
                                  <div className="add_question_body" key={j} style={{marginLeft:"8px",marginBottom:"10px",marginTop:"5px"}}>

                                      <div key={j}>
                                  <div style={{display: 'flex'}} className="">
                                  <div className="form-check">
                                    <label style={{fontSize:"13px"}} onClick={()=>{setOptionAnswer(ques.options[j].optionText, i)}}>

                                    {(ques.questionType!="text") ? 
                                         <input
                                         type={ques.questionType}
                                         name={ques.questionText}
                                         
                                         value="option3"
                                         className="form-check-input"
                                         required={ques.required}
                                         style={{marginRight:"10px",marginBottom:"10px",marginTop:"5px"}}
                                       />:
                                        <ShortText style={{marginRight:"10px"}} />
    }
                                     
                                  {ques.options[j].optionText}
                                    </label>
                                  </div>
                                  </div>
                                </div>
                            </div>   
                           ))}  
                            <div className="add_question_body">
                                <Button size="small"  style={{textTransform: 'none',color:"#4285f4",fontSize:"13px",fontWeight:"600"}}> <BsFileText style={{fontSize:"20px",marginRight:"8px"}}/>Add Answer Feedback</Button>
                            
                            </div>
                          <div className="add_question_bottom">
                          <Button variant="outlined" color="primary"  style={{textTransform: 'none',color:"#4285f4",fontSize:"12px",marginTop:"12px",fontWeight:"600"}} onClick={()=>{doneAnswer(i)}}>
                                          Done
                          </Button>
                          </div>
                        </div>
                        </AccordionDetails>
                    )}
                    {!ques.answer ? (<div className="question_edit">
                                <AddCircleOutline    onClick={addMoreQuestionField} className="edit"/>
                                <OndemandVideo className="edit"/>
                                <CropOriginal className="edit"/>
                                <TextFields className="edit"/>
                    </div>): "" }
                    </div>
                </Accordion>
              </div>
          </div>
        </div>
       )}
    </Draggable>
  )
)
}
    
    

      
    return (
        <div >
          <div className="question_form">
            <br></br>
            <div className="section">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {questionsUI()}

                            {provided.placeholder}
                        </div>
                        )} 
                    </Droppable>
                </DragDropContext>
                <div className="save_form">
            <Button variant="contained" color="primary"  style={{fontSize:"14px"}}>Save</Button>
            </div>
          </div>
    </div>
</div>
    )
}


export default Grade;