import { Fragment, useRef } from "react"

import { Button } from '@mui/material'
import { FileUpload } from '@mui/icons-material';


const UploadButton = ({ content,  variant='contained', handleFile, sx}) => {
  const uploadRef = useRef(null);
  const handleUploadClick = () => {
    uploadRef.current.click();
  }

  const handleChange = (event) => {
    const uploadedFile = event.target.files[0];
    handleFile(uploadedFile);
    uploadRef.current.value = ''
  };
  return (
    <Fragment>
      <Button variant={variant} sx={sx} startIcon={<FileUpload />} onClick={handleUploadClick}>
        {content}
      </Button>
      <input
        type="file"
        ref={uploadRef}
        onChange={handleChange}
        style={{display: 'none'}}
      />
    </Fragment>
  )
}

export default UploadButton;