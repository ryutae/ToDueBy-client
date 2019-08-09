import React from 'react'
import ProjectContext from '../contexts/ProjectContext'
import config from '../config'
import TokenService from '../services/token-service'

export default class TaskPage extends React.Component {
  static contextType = ProjectContext
    constructor(props) {
        super(props)
        this.state = {
            task: {},
            error: null
        }
    }

    componentDidMount() {
        const { task_id } = this.props.match.params
        fetch(`${config.API_ENDPOINT}/tasks/${task_id}`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )        
        .then(resJson => {
            console.log(resJson)
            this.setState({
                task: resJson
            })
        })
        .catch(this.setState({
            error: 'Something went wrong'
        }))
    }
    handleBack = () => {
        
    }
    render() {
        const { task } = this.state
        return (
            <section className='task-page'>
                <h1>Task Page</h1>
                <p>{task.task_name}</p>
                <p>Created by: {task.created_first_name} {task.created_last_name}</p>
                <p>Assigned to: {task.assigned_to_first_name} {task.assigned_to_last_name}</p>
                <p>Due Date: {task.task_due_date}</p>
                <button onClick={() => this.props.history.goBack()} className='back_button'>
                    Back
                </button>
            </section>
        )
  }
}