import { useEffect, useState  } from 'react';

import { 
  Paper,
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton
} from "@mui/material";
import { ContentCopy } from '@mui/icons-material'

import { InvitePopup } from '../components'

import { getPercent } from '../../utils/calculateUtil';




const ClassroomDetail = ({ classroomId, classroom, gradeStructure, isTeacher }) => {
  const [showInvitePopup, setShowInvitePopup] = useState(false);

  const [totalGrade, setTotalGrade] = useState();


  const handleOpenInvitePopup = (e) => {
    setShowInvitePopup(true);
  }

  const handleCopyInviteCode = (e) => {
    navigator.clipboard.writeText(classroom.invite)
  }

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(process.env.REACT_APP_CLIENT_URL + process.env.REACT_APP_INVITE_LINK + classroom.invite + '/public')
  }
  
  useEffect(()=>{
    let total = 0;
    for (const index in gradeStructure) {
      total += gradeStructure[index].weight;
    }
    setTotalGrade(total)
  },[gradeStructure])
  
  
  return (
    <Container>
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(/images/defaultClassroomCardBg.jpg)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography variant="h3" color="inherit" gutterBottom>
                {classroom && classroom.name}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {classroom && classroom.subject}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {/* Invite section */}
          {
            isTeacher && 
            <Card sx={{ mb: 2, border: 1, borderColor: 'grey.400' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Invite Code
                </Typography>
                <Box 
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {classroom && classroom.invite.slice(0, 25) + '...'}
                  </Typography>
                  <IconButton onClick={handleCopyInviteCode}>
                    <ContentCopy/>
                  </IconButton>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleOpenInvitePopup}>
                  Invite
                </Button>
                <Button size="small" onClick={handleCopyInviteLink}>
                  Copy Invite Link
                </Button>
              </CardActions>
            </Card>
          }
          {/* Grade Structure Section */}
          <Card sx={{ border: 1, borderColor: 'grey.400' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Grade Structure
              </Typography>
              {
                gradeStructure.length < 1 ? 
                  <Typography>No Grade Structure</Typography>
                :
                  <List>
                    {gradeStructure.map((grade, index) => (
                        <ListItem 
                          style={{ width:"100%"}}
                          key={index}
                          disableGutters
                          secondaryAction={`${grade.weight} (${getPercent(grade.weight, totalGrade)}%)`}
                        >
                          <ListItemText primary={grade.name} />
                        </ListItem>
                    ))}
                    <ListItem 
                      style={{ width:"100%"}}
                      key='total'
                      disableGutters
                      secondaryAction={`${totalGrade} (100%)`}
                    >
                      <ListItemText primary='Total' />
                    </ListItem>
                  </List>
              }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={9}>
          <Card sx={{ height: "100%" , border: 1, borderColor: 'grey.400'}}>
            <Typography sx={{ m: 4}}>Classroom Detail Content</Typography>
          </Card>
        </Grid>
      </Grid>
      {
        showInvitePopup && 
        <InvitePopup 
          invite={classroom.invite} 
          classroomId={classroomId}
          showInvitePopup={showInvitePopup} 
          setShowInvitePopup={setShowInvitePopup}
        />
      }
    </Container>
    
  )
}

export default ClassroomDetail;