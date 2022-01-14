import { Fragment } from 'react'
import { Box } from '@mui/material';


const CustomNoRowsOverlay = () => {
  return (
    <Fragment>
      <Box sx={{ mt: 10, ml: 1 }}>No Rows</Box>
    </Fragment>
  );
}

export default CustomNoRowsOverlay;