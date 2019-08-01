import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LandingPage from '../pages/LandingPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';

export default class PublicRoutes extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={LandingPage}/>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/register' component={RegisterPage}/>
                </Switch>
            </div>
        )
    }
}