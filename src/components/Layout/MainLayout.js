

import Header from './Header/Header'

const MainLayout = (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  )
}

export default MainLayout;