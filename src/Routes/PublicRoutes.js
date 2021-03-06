import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';

export default class PublicRoutes extends React.Component {
    render() {
        return (
            <div className='main_container_public'>
                <Switch>
                    <Route exact path='/' component={LandingPage}/>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/register' component={RegisterPage}/>
                </Switch>
            </div>
        )
    }
}