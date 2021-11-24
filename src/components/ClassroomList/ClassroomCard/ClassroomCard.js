import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { CircularProgress,Avatar } from "@mui/material";

import { FolderOpen, PermContactCalendar } from "@mui/icons-material";

import AuthContext from '../../../context/AuthContext'

import "./style.css";


const ClassroomCard = ({ classData }) => {
  const { currentUser } = useContext(AuthContext)

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [classroom, setClassroom] = useState(classData);

  const fetchClassrooms = () => {
    setIsLoading(true);
    fetch(process.env.REACT_APP_API_URL + '/api/user/' + classroom.ownerId, { 
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+ currentUser.token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((result) => {
        setClassroom({...classroom, 
          owner: result.name
        })
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    )
  }

  useEffect(() => {
    fetchClassrooms();
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
