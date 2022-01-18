import { Typography, Box } from '@mui/material';


const CustomNoRowsOverlay = () => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Typography sx={{ mt: 10, ml: 1 }}>No Student Grades to show</Typography>
    </Box>
  );
}

export default CustomNoRowsOverlay;