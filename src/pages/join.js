import { Fragment } from 'react'
import { useLocation } from "react-router-dom";

import { JoinClass } from "../components/components";

const JoinPage = (props) => {
  const { joinCode } = useLocation();
  return (
    <Fragment>
      <div>Join class page {joinCode} </div>
      <JoinClass joinCode={joinCode} />
    </Fragment>
  )
}

export default JoinPage;