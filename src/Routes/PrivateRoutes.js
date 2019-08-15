import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProjectPage from '../pages/ProjectPage';
import TaskPage from '../pages/TaskPage';
import SideMenu from '../components/SideMenu/SideMenu';
import CreateTask from '../components/CreateTask/CreateTask'
import CreateProject from '../components/CreateProject/CreateProjectForm'
import UpdateProject from '../components/UpdateProject/UpdateProject';
import MyOpenTasks from '../components/Lists/MyOpenTasks';
import MyCreatedTasks from '../components/Lists/MyCreatedTasks';
import MyCompletedTasks from '../components/Lists/MyCompletedTasks';
import ('./PrivateRoutes.css')

export default class PrivateRoutes extends React.Component {
    render() {
        return (
            <div className='main-container'>
                <SideMenu/>
                <div className='main-content'>
                    <Switch>
                        <Route path='/dashboard' component={HomePage}/>
                        <Route exact path='/project-create' component={CreateProject}/>
                        <Route exact path='/project/:project_id/' component={ProjectPage}/>
                        <Route path='/project/:project_id/edit' component={UpdateProject}/>
                        <Route path='/project/:project_id/task/:task_id' component={TaskPage}/>
                        <Route path='/project/:project_id/create-task' component={CreateTask}/>
                        <Route path='/lists/myopentasks' component={MyOpenTasks}/>
                        <Route path='/lists/mycreatedtasks' component={MyCreatedTasks}/>
                        <Route path='/lists/mycompletedtasks' component={MyCompletedTasks}/>
                    </Switch>
                </div>
            </div>
        )
    }
}