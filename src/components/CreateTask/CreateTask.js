import React from 'react'
import TokenService from '../../services/token-service'
import config from '../../config'
import ProjectContext from '../../contexts/ProjectContext';

export default class CreateTask extends React.Component {
  static contextType = ProjectContext
  constructor(props) {
    super(props)
    this.state = {
      assignedTo: '',
      assignedTo_id: null
    }
  }

  handleCreateTask = e => {
    e.preventDefault()
    const { new_task_name, new_task_description, new_task_due_date, new_task_assigned_to } = e.target
    const { project_id } = this.props.match.params
    fetch(`${config.API_ENDPOINT}/tasks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        project_id: project_id,
        name: new_task_name.value,
        description: new_task_description.value,
        due_date: new_task_due_date.value,
        assigned_to: this.state.assignedTo_id,
      })
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
    .then(this.context.addTask)
    .then(resJson => {
      this.props.history.goBack()
      return resJson
    })
    .catch(this.context.setError)
  }

  handleChangeMember =  e => {
    const assignedTo = e.target.value
    const memberObject = this.context.members.filter(member =>
        assignedTo === (`${member.first_name} ${member.last_name}`)    
    )
    const { id } = memberObject[0]
    this.setState({
      assignedTo: assignedTo,
      assignedTo_id: id
    })
  }

  render() {
    const { assignedTo } = this.state
    return (
      <section className='create-task'>
        <h2>Create Task</h2>
        <form className='create_task_form' onSubmit={this.handleCreateTask}>
          <label>
            Task Name:
            <input type='text' id='new_task_name' name='new_task_name' placeholder='Name' required/>
          </label>
          <label>
            Description:
            <input type='text' id='new_task_description' name='new_task_description' placeholder='Description'/>
          </label>
          <label>
            Due Date:
            <input type='date' id='new_task_due_date' name='new_task_due_date' placeholder='Due Date'/>
          </label>
          <label>
            Assigned To
            <select id='new_task_assigned_to' name='new_task_assigned_to' value={assignedTo} onChange={this.handleChangeMember}>
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


          <button type='submit'>
            Add Task
          </button>
        
        </form>
      </section>
    )
  }
  }


