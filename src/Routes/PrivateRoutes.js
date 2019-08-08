import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProjectPage from '../pages/ProjectPage';
import TaskPage from '../pages/TaskPage';
import SideMenu from '../components/SideMenu/SideMenu';
import ('./PrivateRoutes.css')

export default class PrivateRoutes extends React.Component {
    render() {
        return (
            <div className='main-container'>
                <SideMenu/>
                <Switch className='main-content'>
                    <Route path='/dashboard' component={HomePage}/>
                    <Route exact path='/project/:project_id/' component={ProjectPage}/>
                    <Route path='/project/:project_id/task/:task_id' component={TaskPage}/>
                </Switch>
            </div>
        )
    }
}