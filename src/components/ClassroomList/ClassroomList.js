import { Container, Grid, Typography } from '@mui/material'

import ClassroomCard from './ClassroomCard'




const ClassroomList = ({ classrooms }) => {

  return(
    <Container>
      <Grid container direction="row" justifyContent="center" alignItems="center" spacing={5}>
        {classrooms.length === 0 && (
          <Grid item  >
            <Typography sx={{ mt: 10}}>You are not in any classrooms</Typography>
          </Grid>
        )}
        {classrooms?.map((classroomItem, index) =>{
          return (
            <Grid item key={index} >
              <ClassroomCard classData={classroomItem}/>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default ClassroomList;