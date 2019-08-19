import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Footer from './components/Common/Footer'
import Header from './components/Common/Header'
import PrivateOnlyRoute from './Routes/PrivateOnlyRoute'
import  './App.css';
import PrivateRoutes from './Routes/PrivateRoutes';
import PublicRoutes from './Routes/PublicRoutes';
import PublicOnlyRoute from './Routes/PublicOnlyRoute';

class App extends Component {
  hideSideMenu() {
    return ['/login', '/register', '/'].includes(window.location.pathname)
  }

  render() {
    return (
      <div className="App">
        <Header />  
          <Switch>
            <PrivateOnlyRoute path='/dashboard' component={PrivateRoutes}/>
            <PrivateOnlyRoute path='/project' component={PrivateRoutes}/>
            <PrivateOnlyRoute path='/project-create' component={PrivateRoutes}/>
            <PrivateOnlyRoute path='/lists' component={PrivateRoutes}/>
            <PublicOnlyRoute path='/login' component={PublicRoutes}/>
            <PublicOnlyRoute path='/register' component={PublicRoutes}/>
            <PublicOnlyRoute exact path='/' component={PublicRoutes}/>
          </Switch>
        <Footer/> 
      </div>
    );
  }
}

export default App