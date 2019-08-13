import React from 'react'
import ProjectContext from '../contexts/ProjectContext'
import config from '../config'
import TokenService from '../services/token-service'
import TaskList from '../components/TaskList/TaskList'
import { Link } from 'react-router-dom'

export default class ProjectPage extends React.Component {
  static contextType = ProjectContext

  componentDidMount() {
    const { project_id } = this.props.match.params
    this.context.clearError()
    Promise.all([
    fetch(`${config.API_ENDPOINT}/projects/${project_id}`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      }}),
    fetch(`${config.API_ENDPOINT}/projects/${project_id}/tasks`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      }})
    ])
  
    .then(([res1, res2]) => {
      return Promise.all([res1.json(), res2.json()])
    })
    .then(([res1Json, res2Json]) => {
      console.log(res2Json)
      this.context.setProject(res1Json)
      this.context.setTasks(res2Json)
    })
    .catch(this.context.setError)

  }

  handleAddTask

  render() {
    return (
      <div>
          <h1>Project Page</h1>
          <h2>
            {this.context.project.name}
          </h2>
          <p>{this.context.project.description}</p>
          <Link to={`/project/${this.props.match.params.project_id}/edit`}>
            <button>
              Edit Project
            </button>
          </Link>
          <Link to={`/project/${this.props.match.params.project_id}/create-task`}>
            <button className='add_button'>
              Add Task
            </button>
          </Link>
          <TaskList />
          <button onClick={() => this.props.history.goBack()} className='back_button'>
            Back
          </button>
      </div>
    )
  }
}
