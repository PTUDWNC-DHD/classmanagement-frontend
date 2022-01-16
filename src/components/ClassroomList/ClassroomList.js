import { Container, Grid } from '@mui/material'

import ClassroomCard from './ClassroomCard'




const ClassroomList = ({ classrooms }) => {

  return(
    <Container>
      <Grid container direction="row" justifyContent="center" alignItems="center" spacing={5}>
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