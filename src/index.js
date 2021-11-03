import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


//import layout
import MainLayout from './components/Layout/MainLayout';

//import pages
import HomePage from './page/home';
import ClassroomPage from './page/classroom';
import NotFound from './page/notfound';


const App = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <MainLayout>
          <HomePage/>
        </MainLayout>
      </Route>
      <Route exact path='/classroom'>
        <MainLayout>
          <ClassroomPage/>
        </MainLayout>
      </Route>
      {/* wrong url route to 404 page */}
      <Route path='/notfound' component={NotFound}></Route>
      <Redirect to='/notfound'></Redirect>
    </Switch>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {App()}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
