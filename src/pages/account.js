import { Fragment } from 'react'


import { Drawer, AccountDetail } from "../components/components";

const AccountPage = (props) => {
  return (
    <Fragment>
      <Drawer />
      <AccountDetail />
    </Fragment>
  )
}

export default AccountPage;