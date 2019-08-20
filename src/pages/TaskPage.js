import React from 'react'
import ProjectContext from '../contexts/ProjectContext'
import config from '../config'
import TokenService from '../services/token-service'
import Moment from 'moment';

export default class TaskPage extends React.Component {
  static contextType = ProjectContext
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            task_name: '',
            task_description: '',
            task_id: null,
            task_due_date: '',
            project_id: null,
            created_by_id: null,
            created_first_name: '',
            created_last_name: '',
            assigned_to_id: null, 
            assigned_to_first_name: null,
            assigned_to_last_name: null,
            date_completed: null,
            completed_by_id: null,
            completed_by_first_name: null,
            completed_by_last_name: null,
            formSaved: false,
            formUpdated: false,
            assignedTo: ''
        }
    }

    componentDidMount() {
        this.setState({error: 'null'})
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
            const {task_name,
            task_description,
            task_id,
            task_due_date,
            project_id,
            created_by_id,
            created_first_name,
            created_last_name,
            assigned_to_id, 
            assigned_to_first_name,
            assigned_to_last_name,
            date_completed,
            completed_by_id,
            completed_by_first_name,
            completed_by_last_name } = resJson

            this.setState({
                task_name,
                task_description,
                task_id,
                task_due_date,
                project_id,
                created_by_id,
                created_first_name,
                created_last_name,
                assigned_to_id, 
                assigned_to_first_name,
                assigned_to_last_name,
                date_completed,
                completed_by_id,
                completed_by_first_name,
                completed_by_last_name,
                assignedTo: `${assigned_to_first_name} ${assigned_to_last_name}`
            })
        })
        .catch(this.setState({
            error: 'Something went wrong'
        }))
    }

    handleInputChange = e => {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value,
            formUpdated: true
        })

    }

    handleChangeMember = e => {
        const assignedTo = e.target.value
        const memberObject = this.context.members.filter(member =>
            assignedTo === (`${member.first_name} ${member.last_name}`)    
        )
        const { id, first_name, last_name } = memberObject[0]

        this.setState({
            assignedTo,
            assigned_to_id: id,
            assigned_to_first_name: first_name,
            assigned_to_last_name: last_name,
            formUpdated: true
        })
    }

    handleSave = e => {
        e.preventDefault()
        const { task_name, task_description, task_due_date, assigned_to_id } = this.state
        fetch(`${config.API_ENDPOINT}/tasks/${this.props.match.params.task_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                name: task_name,
                description: task_description, 
                due_date: task_due_date,
                assigned_to: assigned_to_id
            })
        })
        .then(this.fetchTasks)
        .then(this.setState({formSaved: true}))
    }

    fetchTasks = () => {
        fetch(`${config.API_ENDPOINT}/projects/${this.props.match.params.project_id}/tasks`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => res.json())
        .then(resJson => {
            this.context.setTasks(resJson)
        })
        
    }

    handleCompleteTask = e => {
        e.preventDefault()
        fetch(`${config.API_ENDPOINT}/tasks/${this.props.match.params.task_id}/complete`, {
            method: 'POST',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(this.fetchTasks)
        .then(this.props.history.goBack())
    }

    renderComplete() {
        const { date_completed,
            completed_by_first_name,
            completed_by_last_name } = this.state
        return (
            <div className='completed_details'>
                <p>{completed_by_first_name} {completed_by_last_name} completed this task on {Moment(date_completed).format('MMMM Do YYYY')}</p>
            </div>
        )
    }
   
    render() {
        const { 
            task_name,
            task_due_date,
            created_first_name,
            created_last_name,
            completed_by_id,
            formUpdated,
            assignedTo,
            formSaved  } = this.state

        return (
            <section className='task-page'>
                <form className='task_form' onSubmit={this.handleSave}>
                    <p className='sub_header'>Task:</p>
                    <input type='text' name='task_name' id='task_name' value={task_name} placeholder='Task' required onChange={this.handleInputChange}/>
                    <p>Created by: {created_first_name} {created_last_name}</p>
                    <label>
                        Assigned To
                        <select name='assigned_to' value={assignedTo} onChange={this.handleChangeMember}>
                            <option value={null}>
                                
                            </option>
                            {this.context.members.map(member => {
                            return (
                                <option key={member.id} value={`${member.first_name} ${member.last_name}`}>
                                    {member.first_name} {member.last_name}
                                </option>
                            )

                            })}
                        </select>
                    </label>

                    <label>
                        Due Date
                        <input name='task_due_date' type='date' id='task_due_date' value={Moment(task_due_date).format('YYYY-MM-DD')} placeholder='Set Due Date' onChange={this.handleInputChange}/>
                    </label>

                    {formUpdated &&
                    <button type='submit'>
                        Save
                    </button>
                    }
                </form>
                {formSaved && <p className='saved_message'>Task saved</p>}
                {completed_by_id && this.renderComplete()}
                {!completed_by_id && <button className='add_button' onClick={this.handleCompleteTask}>
                    Complete Task
                </button>}
                <button onClick={() => this.props.history.goBack()} className='back_button'>
                    Back
                </button>
            </section>
        )
  }
}
