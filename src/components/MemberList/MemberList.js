import { Link } from "react-router-dom";

import { 
  Box, 
  Container, 
  Avatar, 
  ListItemAvatar, 
  ListItemText, 
  Table, 
  TableBody, 
  TableCell, 
  TableRow, 
  Typography 
} from "@mui/material";



const MemberList = ({students, teachers}) => {

  return (
    <Container maxWidth='sm'>
      <Box sx={{ mb: 10}}>
        <Typography variant='h5'>Teachers</Typography>
        <Table size="medium" >
          <TableBody>
            {!teachers.length ? <TableRow><TableCell>Class has no teacher</TableCell></TableRow> :
            teachers.map((teacher, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar>{teacher.name.charAt(0)}</Avatar>
                  </TableCell>
                <TableCell>
                  <Link to={`/users/${teacher._id}`}>
                    <Typography variant='h6'>{teacher.name}</Typography>
                  </Link>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      
      <Box>
        <Typography variant='h5'>Students</Typography>
        <Table size="medium">
          <TableBody>
            {!students.length ? <TableRow><TableCell>Class has no student</TableCell></TableRow> :
            students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar>{student.name.charAt(0)}</Avatar>
                </TableCell>
                <TableCell>
                  <Link to={`/users/${student._id}`}>
                    <Typography variant='h6'>{student.name}</Typography>
                  </Link>
                  
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
}

export default MemberList;