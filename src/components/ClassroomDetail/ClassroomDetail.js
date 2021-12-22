import { useState, useEffect, useContext } from 'react';


import AuthContext from '../../contexts/authContext'
import { getClassroomDetail } from '../../services/classroomService';

import { CircularProgress, Button, IconButton, List, ListItem, ListItemText } from "@mui/material";

import { ContentCopy } from '@mui/icons-material'

import { InvitePopup } from "../components";

import './style.css'



const ClassroomDetail = ({classroomId, classroom, gradeStructure, isTeacher, isLoading, errorMessage}) => {
  const { currentUser } = useContext(AuthContext)

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  //const [image, setImage] = useState(null);
  const [showInvitePopup, setShowInvitePopup] = useState(false);

  const handleUpload = (e) => {}

  const handleChange = (e) => {}

  const handleOpenInvitePopup = (e) => {
    setShowInvitePopup(true);
  }

  const handleCopyInviteCode = (e) => {
    navigator.clipboard.writeText(process.env.REACT_APP_CLIENT_URL + process.env.REACT_APP_INVITE_LINK + classroom.invite + '/public')
  }
  
  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  } 
  else if (isLoading) {
    return(
      <div className="center-parent">
      <CircularProgress  />
      </div>
    );
  } 
  else {
    return (
      <div className="main">
        <div className="main__wrapper">
          <div className="main__content">
            <div className="main__wrapper1">
              <div className="main__bgImage">
                <div className="main__emptyStyles" />
              </div>
              <div className="main__text">
                <h1 className="main__heading main__overflow">
                  {classroom.name}
                </h1>
                <div className="main__section main__overflow">
                  {classroom.subject}
                </div>
                { isTeacher && (
                  <div className="main__wrapper2">
                    <em className="main__code">Class Invite Code:</em>
                    <div className="main__id">
                      {classroom.invite}
                    </div>
                    <div>
                    <em className="main__code">Copy Link Invite:</em>
                      <IconButton edge="end" color="inherit" aria-label="copy" onClick={handleCopyInviteCode}>
                        <ContentCopy />
                      </IconButton>
                    </div>
                    <Button
                      onClick={handleOpenInvitePopup}
                      color="primary"
                      variant="contained"
                    >
                      Invite
                    </Button>
                  </div>
                  )
                }
              </div>
            </div>
          </div>
          <div className="main__announce">
            <div className="main__status">
              <p>Upcoming</p>
              <p className="main__subText">No work due</p>
            </div>
            
            </div>
          {showInvitePopup && <InvitePopup 
            invite={classroom.invite} 
            classroomId={classroomId}
            showInvitePopup={showInvitePopup} 
            setShowInvitePopup={setShowInvitePopup}
          />}
          <div className="main__announce">
            <div className="main__status">
              <p>Grade Structure</p>
              {
                gradeStructure.length < 1 ? 
                  <p className="main__subText">No Grade Structure</p>
                :
                  <List>
                    {gradeStructure.map((grade, index) => (
                      <ListItem 
                        style={{width:"150px"}}
                        key={index}
                        disableGutters
                        secondaryAction={grade.weight}
                      >
                        <ListItemText primary={grade.name} />
                      </ListItem>
                    ))}
                  </List>
              }
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}

export default ClassroomDetail;