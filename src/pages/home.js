import { Fragment } from 'react'


import { Drawer, ClassroomList } from "../components/components";

const HomePage = (props) => {
  return (
    <Fragment>
      <Drawer />
      <ClassroomList />
    </Fragment>
  )
}

export default HomePage;