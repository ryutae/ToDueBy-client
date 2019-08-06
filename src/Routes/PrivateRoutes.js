import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProjectPage from '../pages/ProjectPage';
import SideMenu from '../components/SideMenu/SideMenu';
import ('./PrivateRoutes.css')

export default class PrivateRoutes extends React.Component {
    render() {
        return (
            <div className='main-container'>
                <SideMenu/>
                <Switch className='main-content'>
                    <Route path='/dashboard' component={HomePage}/>
                    <Route path='/dashboard/:project_id' component={ProjectPage}/>
                </Switch>
            </div>
        )
    }
}