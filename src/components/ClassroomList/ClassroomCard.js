import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { 
  Avatar,
  Stack,
  Card, 
  CardActions, 
  CardContent,
  Typography,
  ImageListItem,
  ImageListItemBar
} from "@mui/material";
import { FolderOpen, PermContactCalendar } from "@mui/icons-material";

import { LoadingIndicator } from "../components";

import { getUserDetail } from "../../services/userService";

import AuthContext from '../../contexts/authContext'


const ClassroomCard = ({ classData }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext)

  const [classroom, setClassroom] = useState(classData);

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    callFetchOwnerData();
  }, [])

  const callFetchOwnerData = async () => {
    setIsLoading(true);
    const result = await getUserDetail(currentUser.token, classroom.ownerId)
    if (result.data) {
      setClassroom({...classroom, owner: result.data.name})
    }
    else if (result.error) {
      setHasError(true)
      console.log('fetch owner error: ', result.error)
    }
    setIsLoading(false);
  }

  const handleCardOnClick = () => {
    navigate(`/classroom/${classroom._id}`);
  }
  
  return (
    <Card sx={{ width: 300, my: 5 }}>
      <ImageListItem onClick={handleCardOnClick}>
        <img
          src={`/images/defaultClassroomCardBg.jpg`}
          alt="card background"
          loading="lazy"
        />
        <ImageListItemBar
          title={
            <Typography component="div" variant="h5">
              {classroom.name}
            </Typography>
          }
          subtitle={
            isLoading ?
              <LoadingIndicator type="text"/>
            :
              <Typography variant="subtitle1" component="div">
                {classroom.owner}
              </Typography>
          }
          actionIcon={
            isLoading ?
              <LoadingIndicator sx={{ mr: 2 }} type="circular"/>
            :
              <Avatar sx={{ mr: 2 }}>
                {currentUser && currentUser.user.name.charAt(0)}
              </Avatar>
          }
        />
      </ImageListItem>
      <CardContent sx={{ height: 50 }}>
        <Typography component="div" variant="body1">
          
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <FolderOpen />
          <PermContactCalendar />
        </Stack>
      </CardActions>
    </Card>
  )
};

export default ClassroomCard;
