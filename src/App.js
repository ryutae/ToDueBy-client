import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Footer from './components/Common/Footer'
import Header from './components/Common/Header'

import  './App.css';
import PrivateRoutes from './Routes/PrivateRoutes';
import PublicRoutes from './Routes/PublicRoutes';

class App extends Component {
  hideSideMenu() {
    return ['/login', '/register', '/'].includes(window.location.pathname)
  }
  render() {
    return (
      <div className="App">
        <Header />  
          <Switch>
            <Route path='/dashboard' component={PrivateRoutes}/>
            <Route path='/project' component={PrivateRoutes}/>
            <Route path='/project-create' component={PrivateRoutes}/>
            <Route path='/lists' component={PrivateRoutes}/>
            <Route component={PublicRoutes}/>
            {/* <Route 
              exact path='/home' 
              component={HomePage}>
            </Route>
            <Route 
              exact path='/' 
              component={LandingPage}>
            </Route>
            <Route 
              exact path='/login' 
              component={LoginPage}>
            </Route>
            <Route 
              exact path='/register' 
              component={RegisterPage}>
            </Route>
            <Route 
              path='/team/:teamId' 
              component={TeamPage}>
            </Route>
            <Route 
              path='/team/:teamId/project/projectId' 
              component={ProjectPage}>
            </Route> */}
          </Switch>
        <Footer/> 
      </div>
    );
  }
}

export default App