import React from 'react'
import { Link } from 'react-router-dom'
import ProjectList from '../components/ProjectList/ProjectList'

export default class HomePage extends React.Component {
  
  render() {
    return (
      <div className='home-page'>
        <p className='title'>Home Page</p>
        <h3>Projects</h3>
        <ProjectList/>
        <Link to='/project-create' className='project_create'>
          <button className='create_project_button'>Create Project</button>
        </Link>
      </div>
    )
  }
}
