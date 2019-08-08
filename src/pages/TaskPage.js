import React from 'react'
import ProjectContext from '../contexts/ProjectContext'
import config from '../config'
import TokenService from '../services/token-service'
import TaskList from '../components/TaskList/TaskList'

export default class TaskPage extends React.Component {
  static contextType = ProjectContext

  render() {
      return (
          <section className='task-page'>
              <h1>Task Page</h1>
          </section>
      )
  }
}