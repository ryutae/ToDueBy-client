import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Footer from './components/Common/Footer'
import Header from './components/Common/Header'
import HomePage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import TeamPage from './components/pages/TeamPage'
import ProjectPage from './components/pages/ProjectPage'
import LandingPage from './components/pages/LandingPage'
import  './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <main>
          <Switch>
            <Route 
              exact path='/' 
              component={HomePage}>
            </Route>
            <Route 
              exact path='/welcome' 
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

