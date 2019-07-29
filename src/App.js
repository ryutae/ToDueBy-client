import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Footer from './components/Common/Footer'
import Header from './components/Common/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TeamPage from './pages/TeamPage'
import ProjectPage from './pages/ProjectPage'
import LandingPage from './pages/LandingPage'
import  './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <main>
          <Switch>
            <Route 
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
              exact path='/team/:teamId' 
              component={TeamPage}>
            </Route>
            <Route 
              path='/team/:teamId/project/projectId' 
              component={ProjectPage}>
            </Route>
          </Switch>
        </main>
        <Footer/> 
      </div>
    );
  }
}

export default App