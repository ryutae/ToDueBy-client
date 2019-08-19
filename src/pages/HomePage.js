import React from 'react'
import { Link } from 'react-router-dom'
import ProjectList from '../components/ProjectList/ProjectList'
import config from '../config';
import TokenService from '../services/token-service'
import ProjectListContext from '../contexts/ProjectListContext'

export default class HomePage extends React.Component {
  static contextType = ProjectListContext
  state = {
    joinProjects: [],
    joinProjectSelected: null,
    error: null
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/projects/project/join`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },    
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
    .then(resJson => {
      this.setState({joinProjects: resJson})
    }) 
    .catch(error => this.setState({ error }))
  }

  handleJoinGroup = e => {
    e.preventDefault()
    const joinProjectName = e.target.project.value
    const projectObject = this.state.joinProjects.filter(project => 
      project.name === joinProjectName
      )
    const project_id = projectObject[0].id
    fetch(`${config.API_ENDPOINT}/projects/join/${project_id}`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
    .then(this.fetchProjectList)
    .catch(error => this.setState({ error }))
  }

  fetchProjectList = () => {
    fetch(`${config.API_ENDPOINT}/projects`, {
      method: 'GET',
      headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
      }
    })
    .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
    )
    .then(this.context.setProjectList)
    .catch(this.context.setError)
  }

  handleJoinProjectSelectChange = e => {
    const project = e.target.value
    this.setState({
      joinProjectSelected: project
    })
  }

  render() {
    const {joinProjectSelected} = this.state
    return (
      <div className='home-page'>
        <p className='title'>Home Page</p>
        <h3>Projects</h3>
        <ProjectList/>
        <Link to='/project-create' className='project_create'>
          <button className='add_button'>Create Project</button>
        </Link>
        <form onSubmit={this.handleJoinGroup} onChange={this.handleJoinProjectSelectChange}>
          <label>
            Join Project
          </label>
            <select name='project' list='projects' >
            <option key='9999' value=''/>
            {this.state.joinProjects.map(project => {
              return <option key={project.id} value={`${project.name}`}>{project.name}</option>
            })}
   
            </select>
          
          {joinProjectSelected && <button type='submit'>
            Join
          </button>
          }
        </form>
      </div>
    )
  }
}
