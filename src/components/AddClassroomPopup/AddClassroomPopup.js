import { useState } from 'react'
import { Box, IconButton, TextField, Modal, Button, Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { AddCircleOutline, SaveRounded } from '@mui/icons-material';
import classes from './style'




const AddClassroomPopup = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] =useState(false);
  const [className, setClassName] = useState("");
  const [classSubject, setClassSubject] = useState("");
  const [classDescription, setClassDescription] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleOnSubmit = (event) => {
    event.preventDefault(); 
    const newClassroom = {
      name: className, 
      subject: classSubject, 
      description: classDescription
    }
    setIsPending(true);
    fetch(process.env.REACT_APP_API_URL+'/classrooms', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newClassroom)
    })
    .then(() => {
      setIsPending(false);
      props.fetch();
      handleClose();
    })
    .catch((error) => {
      console.log(error);
      handleClose();
    })
  }

  return (
    <div>
      <IconButton color="primary" onClick={handleOpen}>
        <AddCircleOutline/>
      </IconButton>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={classes.popupBox}>
          <Typography sx={classes.popupTitle} variant="h4" align="center">
            Classroom information
          </Typography>
          <form onSubmit={handleOnSubmit}>
            <Stack spacing={3}>
            <TextField
              required
              name="name"
              label="Class name"
              onChange={(e)=>{setClassName(e.target.value)}}
            />
            <TextField
              required
              name="subject"
              label="Subject"
              onChange={(e)=>{setClassSubject(e.target.value)}}
            />
            <TextField
              fullWidth
              name="description"
              label="Description"
              onChange={(e)=>{setClassDescription(e.target.value)}}
            />
            </Stack>

            {!isPending && 
              <Button sx={classes.submit} fullWidth size="large" type="submit" variant="contained">
                Create Classroom
              </Button>
            }

            {isPending && 
              <LoadingButton
                sx={classes.submit}
                fullWidth 
                size="large"
                loading
                loadingPosition="start"
                startIcon={<SaveRounded/>}
                variant="outlined"
              >
                Creating Classroom...
              </LoadingButton>
            }
            
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddClassroomPopup;
