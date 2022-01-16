import { CircularProgress, Skeleton } from "@mui/material";

const LoadingIndicator = ({ type }) => {
  switch (type) {
    default:
    case 'spinner':
      return (
        <CircularProgress  />
      )
    case 'text':
      return (
        <Skeleton variant="text" />
      )
    case 'circular':
      return (
        <Skeleton variant="circular" width={40} height={40} />
      )
      
  }
  
}

export default LoadingIndicator;