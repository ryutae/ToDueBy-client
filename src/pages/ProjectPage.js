import React from 'react'
import ProjectContext from '../contexts/ProjectContext'
import config from '../config'
import TokenService from '../services/token-service'
import TaskList from '../components/TaskList/TaskList'
import { Link } from 'react-router-dom'
import MemberList from '../components/MemberList/MemberList';

export default class ProjectPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      project_id: null
    }
  }
  static contextType = ProjectContext

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.project_id !== this.props.match.params.project_id) {

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
            }}),
            fetch(`${config.API_ENDPOINT}/projects/${project_id}/members`, {
              method: 'GET',
              headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
              }
            })
    ])
  
    .then(([res1, res2, res3]) => {
      return Promise.all([res1.json(), res2.json(), res3.json()])
    })
    .then(([res1Json, res2Json, res3Json]) => {
      this.context.setProject(res1Json)
      this.context.setTasks(res2Json)
      this.context.setMembers(res3Json)
    })
    .catch(this.context.setError)
  }

  }
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
      }}),
    fetch(`${config.API_ENDPOINT}/projects/${project_id}/members`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    ])
  
    .then(([res1, res2, res3]) => {
      return Promise.all([res1.json(), res2.json(), res3.json()])
    })
    .then(([res1Json, res2Json, res3Json]) => {
      this.context.setProject(res1Json)
      this.context.setTasks(res2Json)
      this.context.setMembers(res3Json)
    })
    .catch(this.context.setError)

  }

  render() {
    const uncompletedTasks = this.context.tasks.filter(task => task.completed_by == null)
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
          <MemberList />
          <TaskList tasks={uncompletedTasks} />
          <button onClick={() => this.props.history.goBack()} className='back_button'>
            Back
          </button>
      </div>
    )
  }

}
