import { Typography } from "@mui/material";

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {'Copyright © DHD TEAM '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;