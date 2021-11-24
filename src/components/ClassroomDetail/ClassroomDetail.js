import { useState, useEffect, useContext } from 'react';


import AuthContext from '../../context/AuthContext'

import { CircularProgress, Avatar, Button, TextField, IconButton } from "@mui/material";

import { ContentCopy } from '@mui/icons-material'

import { InvitePopup } from "../components";

import './style.css'



const ClassroomDetail = (props) => {
  const { currentUser } = useContext(AuthContext)

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [classroom, setClassroom] = useState(null);

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [showInvitePopup, setShowInvitePopup] = useState(false);

  const handleUpload = (e) => {}

  const handleChange = (e) => {}

  const handleOpenInvitePopup = (e) => {
    setShowInvitePopup(true);
  }

  const handleCopyInviteCode = (e) => {
    navigator.clipboard.writeText(process.env.REACT_APP_API_URL + process.env.REACT_APP_INVITE_LINK + classroom.invite)
  }

  const fetchClassroom = () => {
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
      setClassroom(result)
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    fetchClassroom(classroom);
    console.log(currentUser, classroom)
  }, [])
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (isLoading) {
    return(
      <div className="center-parent">
      <CircularProgress  />
      </div>
    );
  } else {
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
                { currentUser.user._id === classroom.ownerId && (
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
            <div className="main__announcements">
              <div className="main__announcementsWrapper">
                <div className="main__ancContent">
                  {showInput ? (
                    <div className="main__form">
                      <TextField
                        id="filled-multiline-flexible"
                        multiline
                        label="Announce Something to class"
                        variant="filled"
                        value={inputValue}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <div className="main__buttons">
                        <input
                          onChange={handleChange}
                          variant="outlined"
                          color="primary"
                          type="file"
                        />

                        <div>
                          <Button onClick={() => setShowInput(false)}>
                            Cancel
                          </Button>

                          <Button
                            onClick={handleUpload}
                            color="primary"
                            variant="contained"
                          >
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="main__wrapper100"
                      onClick={() => setShowInput(true)}
                    >
                      <Avatar />
                      <div>Announce Something to class</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {showInvitePopup && <InvitePopup 
            invite={classroom.invite} 
            showInvitePopup={showInvitePopup} 
            setShowInvitePopup={setShowInvitePopup}
          />}
        </div>
      </div>
    )
  }
}

export default ClassroomDetail;