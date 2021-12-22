import { Fragment, useRef } from "react"
import { CSVLink } from "react-csv";

import { Button } from '@mui/material'
import { FileDownload } from '@mui/icons-material';


const DownloadButton = ({ content,  variant='outlined', filename, headers, data }) => {
  const downloadRef = useRef(null);
  const handleDownloadClick = () => {
    downloadRef.current.link.click();
  }

  return (
    <Fragment>
      <Button variant={variant}  endIcon={<FileDownload />} onClick={handleDownloadClick}>
        {content}
      </Button>
      <CSVLink headers={headers} filename={filename} data={data} ref={downloadRef}/>
    </Fragment>
  )
}

export default DownloadButton;