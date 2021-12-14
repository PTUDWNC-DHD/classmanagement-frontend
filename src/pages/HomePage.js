import { Fragment } from 'react'


import { Header, ClassroomList } from "../components/components";

const HomePage = (props) => {
  return (
    <Fragment>
      <Header />
      <ClassroomList />
    </Fragment>
  )
}

export default HomePage;