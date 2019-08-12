import React from 'react'
import { Link } from 'react-router-dom'
import ProjectList from '../components/ProjectList/ProjectList'
import config from '../config';
import TokenService from '../services/token-service'
import ProjectListContext from '../contexts/ProjectListContext'

export default class HomePage extends React.Component {
  static contextType = ProjectListContext
  state = {
    allProjects: [],
    error: null
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/projects/project/all`, {
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
      this.setState({allProjects: resJson})
    }) 
    .catch(error => this.setState({ error }))
  }

  handleJoinGroup = e => {
    e.preventDefault()
    const joinProjectName = e.target.project.value
    const projectObject = this.state.allProjects.filter(project => 
      project.name === joinProjectName
      )
    const project_id = projectObject[0].id
    console.log(`${config.API_ENDPOINT}/projects/join/${project_id}`)
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

  render() {
    return (
      <div className='home-page'>
        <p className='title'>Home Page</p>
        <h3>Projects</h3>
        <ProjectList/>
        <Link to='/project-create' className='project_create'>
          <button className='create_project_button'>Create Project</button>
        </Link>
        <form onSubmit={this.handleJoinGroup}>
          <label>
            Join Project
            <input type='text' name='project' list='projects' />
          </label>
          <datalist id='projects'>
            {this.state.allProjects.map(project => {
              return <option value={`${project.name}`} />
            })}
          </datalist>
          
          <button type='submit'>
            Join
          </button>
        </form>
      </div>
    )
  }
}
