import { Card, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography, Stack } from '@mui/material';
import { MoreVert, FolderOpenRounded } from '@mui/icons-material';
import { red } from '@mui/material/colors';

import classes from './style'

const ClassroomCard = (props) => {
  const defaultClassroomCardBg = {
    img: '/defaultClassroomCardBg.jpg',
    title: 'Temp Bg'
  }

  return(
    <Card sx={classes.Card}>
      <CardHeader
        
        title={props.data.name}
        subheader={props.data.subject}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        />
      <CardMedia
        component="img"
        height="194"
        image={defaultClassroomCardBg.img}
        alt={defaultClassroomCardBg.title}
      />
      {
        props.data.teacher &&
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              N
            </Avatar>
          }
          title={props.data.teacher.name}
          
        />
      }
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.data.description}
        </Typography>
        <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={0}>
          <IconButton>
            <FolderOpenRounded/>
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ClassroomCard;