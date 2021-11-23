import { Fragment } from 'react'
import { useLocation } from "react-router-dom";

import { Drawer, ClassroomDetail } from "../components/components";

const ClassroomPage = (props) => {
  const { classroomId } = useLocation();
  return (
    <Fragment>
      <Drawer />
      <ClassroomDetail classroomId={classroomId}/>
    </Fragment>
  )
}

export default ClassroomPage;