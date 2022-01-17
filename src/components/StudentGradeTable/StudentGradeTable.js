import { useState, useContext, useEffect } from "react";

import { 
  Card,
  Box, 
  Container, 
  Grid,
  Typography, 
  Button,
  TextField,
  Divider
} from "@mui/material";
import ReviewDialog from "./ReviewDialog";

import { getAllStudentGrades } from '../../services/classroomService';
import { fetchAddMessageToReview, fetchGetReview } from "../../services/reviewService";

import AuthContext from "../../contexts/authContext";

const StudentGradeTable = ({ classroomId, gradeStructure}) => {
  const { currentUser } = useContext(AuthContext);
  const [grades, setGrades] = useState();
  const [finalizedGrades, setFinalizedGrades] = useState([]);

  const [isOpenReviewDialog, setIsOpenReviewDialog] = useState(false);
  const [gradeReview, setGradeReview] = useState({ structureId: '', currentGrade: ''});
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    if (finalizedGrades.length > 0) {
      for (const index in finalizedGrades) {
        const result = fetchGetReview(currentUser.token, classroomId, finalizedGrades[index].structureId, currentUser.user.studentId)
        console.log('result comment: ', result)
      }
    }
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
    callFetchToGetGrades(currentUser.token, classroomId)
  },[])

  const callFetchToGetGrades = async (token, classroomId) => {
    setIsLoading(true);
    const result = await getAllStudentGrades(token, classroomId) 
    if (result.data) {
      setGrades(result.data[currentUser.user.studentId])
    }
    else if (result.error)
      setErrorMessage(result.error)
    setIsLoading(false);
  }


  const handleCommentChange = (index, value) => {
    setComment(value)
  }

  const handleAddComment = async (index) => {
    const structureId = finalizedGrades[index].structureId;
    const result = await fetchAddMessageToReview(currentUser.token, classroomId, structureId, currentUser.user.studentId, comment) 
    if (result.data) {

    }
    else if (result.error)
      setErrorMessage(result.error)
  }

  const handleOpenReview = (index) => {
    setIsOpenReviewDialog(true);
    setGradeReview({
      structureId: finalizedGrades[index].structureId,
      currentGrade: finalizedGrades[index].value
    })
  }

  return (
    <Container maxWidth='sm'>
      <Box sx={{ mb: 10, p: 3}}>
        <Card sx={{ mb: 3, p: 3}}>
          <Grid container spacing={2} sx={{ mb: 3}}>
            <Grid item xs={8}>
              <Typography variant='h5'>{currentUser.user.name}</Typography>
            </Grid>
            <Grid item xs={4}>
            <Typography variant='h5'>{currentUser.user.studentId}</Typography>
            </Grid>
          </Grid>
        </Card>
        {
          finalizedGrades.map((grade, index) => {
            return (
              <Card sx={{ mb: 3, p: 3}} key={index}>
                <Grid container spacing={2} >
                  <Grid item xs={8}>
                    <Typography variant='h6'>{grade.name}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant='h6'>{grade.value}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Button onClick={() => handleOpenReview(index)}>Review</Button>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={2} >
                  <Grid item xs={10}>
                  <TextField
                    required
                    fullWidth
                    margin="normal"
                    label="Comment"
                    name="comment"
                    value={comment}
                    onChange={(e) => handleCommentChange(index, e.target.value)}
                  />
                  </Grid>
                  <Grid item xs={2} sx={{ display: 'flex'}}>
                    <Button onClick={() => handleAddComment(index)} disabled={!comment}>Comment</Button>
                  </Grid>
                </Grid>
              </Card>
            )
          })
        }
        
      </Box>
      
      <ReviewDialog 
        isOpen={isOpenReviewDialog} 
        setIsOpen={setIsOpenReviewDialog} 
        classId={classroomId} 
        structureId={gradeReview?.structureId} 
        studentId={currentUser.user.studentId} 
        currentGrade={gradeReview?.currentGrade}
      />
    </Container>
  );
}

export default StudentGradeTable;