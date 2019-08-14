import React from 'react'
import config from '../../config';
import TokenService from '../../services/token-service';
import ProjectContext from '../../contexts/ProjectContext';

export default class TaskAssign extends React.Component {
    static contextType = ProjectContext
    constructor(props) {
        super(props)
        this.state = {
            assignedTo: ''
        }
    }

    handleAssignTask = e => {
        e.preventDefault()
        const { assignedTo } = this.state
        const memberObject = this.context.members.filter(member =>
            assignedTo === (`${member.first_name} ${member.last_name}`)    
        )
        console.log(memberObject)
        const member_id = memberObject[0].id 
        fetch(`${config.API_ENDPOINT}/tasks/${this.props.match.params.task_id}/assign`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                assignTo: member_id
            })
        })
        .then(this.fetchTasks)
        .then(this.props.history.goBack())
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

    handleChangeMember = member => {
        this.setState({
            assignedTo: member
        })
    }

    componentDidMount() {
        const { task } = this.props
        if (task.assigned_to_first_name) {
            this.setState({
                assignedTo: `${task.assigned_to_first_name} ${task.assigned_to_last_name}`
            })
        }
    }


    render() {
        const { assignedTo } = this.state
        return (
            <>
                <input type='text' name='assign' list='members' placeholder='Assign To' value={assignedTo} onChange={this.props.handleChangeMember}/>
                <datalist id='members'>
                    {this.context.members.map(member => {
                    return <option key={member.id} value={`${member.first_name} ${member.last_name}`} />
                    })}
                </datalist>
            </>

        )
    }
}