import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { 
  Box, 
  Grid,
  Typography, 
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";

import ReviewDialog from "./ReviewDialog";

import { fetchAddMessageToReview, fetchGetReview } from "../../services/reviewService";
import * as Notifications from '../../utils/notifications'


const StudentGrade = ({ token, name, value, classroomId, structureId, studentId, userId, isTeacher }) => {
  const [isOpenReviewDialog, setIsOpenReviewDialog] = useState(false);
  const [comment, setComment] = useState('');
  const [review, setReview] = useState('');
  const [expectGrade, setExpectGrade] = useState(0);

  useEffect(()=>{
    if (review)
      setExpectGrade(review.expectedGrade)
  },[review])

  useEffect(()=>{
    callFetchToGetReview();
  },[])

  const handleAddComment = async () => {
    const result = await fetchAddMessageToReview(token, classroomId, structureId, studentId, comment) 
    if (result.data) {
      callFetchToGetReview();
      setComment('');
    } 
    else if (result.error){
      console.log('add comment err: ', result.error)
    }
  }

  const callFetchToGetReview = async () => {
    const result = await fetchGetReview(token, classroomId, structureId, studentId);
    if (result.data) {
      setReview(result.data);
    } 
    else if (result.error){
      setReview('');
      console.log('No comment in review: ', result.error)
    }
  }

  const handleCommentChange = (value) => {
    setComment(value)
  }

  const handleOpenReview = () => {
    if (review && !isTeacher) {
      Swal.fire({
        title: "Error",
        text: Notifications.HAS_ADD_REVIEW,
        icon: "error",
        button: "Close",
      })
    }
    else if (isTeacher && !review) {
      Swal.fire({
        title: "Error",
        text: Notifications.NO_REVIEW,
        icon: "error",
        button: "Close",
      })
    }
    else {
      setIsOpenReviewDialog(true);
    }
  }

  const checkCommentSender = (sender) => {
    if (isTeacher) {
      if (sender === userId)
        return 'Teacher: '
      else
        return 'Student: '
    }
    else {
      if (sender === userId)
        return 'Student: '
      else
        return 'Teacher: '
    }
  }


  return (
    <Box sx={{ mb: 2 }}>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container spacing={2} >
            <Grid item xs={8}>
              <Typography variant='h6'>{name}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='h6'>{`${value} /10`}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={handleOpenReview}>{isTeacher ? 'View Review' : 'Add Review'}</Button>
            </Grid>
            
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
        {
          review?.messages?.map((message, index) => {
            return (
              <Grid container spacing={2} key={index}>
                <Grid item xs={4}>
                  <Typography variant='h6'>{checkCommentSender(message.userId)}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant='h6'>{message.message}</Typography>
                </Grid>
              </Grid>
            )
          })
        }

          <Grid container spacing={2} >
            <Grid item xs={10}>
              <TextField
                required
                fullWidth
                margin="normal"
                label="Comment"
                name="comment"
                value={comment}
                onChange={(e) => handleCommentChange(e.target.value)}
              />
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex'}}>
              <Button onClick={() => handleAddComment()} disabled={!comment}>Comment</Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <ReviewDialog 
        isOpen={isOpenReviewDialog} 
        setIsOpen={setIsOpenReviewDialog} 
        classId={classroomId} 
        structureId={structureId} 
        studentId={studentId} 
        currentGrade={value}
        review={review}
        isTeacher={isTeacher}
      />
    </Box>
  )
}

export default StudentGrade;