import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from '../../../contexts/authContext'
import { getUserDetail } from "../../../services/userService";

import { CircularProgress,Avatar } from "@mui/material";
import { FolderOpen, PermContactCalendar } from "@mui/icons-material";

import "./style.css";


const ClassroomCard = ({ classData }) => {
  const { currentUser } = useContext(AuthContext)

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [classroom, setClassroom] = useState(classData);

  const callFetchOwnerData = async () => {
    setIsLoading(true);
    const result = await getUserDetail(currentUser.token, classroom.ownerId)
    if (result.data) {
      setClassroom({...classroom, owner: result.data.name})
    }
    else if (result.error) {
      setErrorMessage(result.error)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    callFetchOwnerData();
  }, [])
  
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
      <li className="joined__list">
        <div className="joined__wrapper">
          <div className="joined__container">
            <div className="joined__imgWrapper" />
            <div className="joined__image" />
            <div className="joined__content">
              <Link 
                className="joined__title" 
                to={{
                  pathname: `/classroom/${classroom._id}`,
                  classroomId: classroom._id
                }} 
              >
                <h2>{classroom.name}</h2>
              </Link>
              <p className="joined__owner">{classroom.owner}</p>
            </div>
          </div>
          <Avatar
            className="joined__avatar"
            src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg"
          />
        </div>
        <div className="joined__bottom">
          <PermContactCalendar />
          <FolderOpen />
        </div>
      </li>
    )
  }
};

export default ClassroomCard;
