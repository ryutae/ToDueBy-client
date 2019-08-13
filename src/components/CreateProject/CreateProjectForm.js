import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'

export default class CreateProjectForm extends React.Component{
    state = {
        error: null,
        errorProjectName: null
    }

    handleSubmitCreateProject = e => {
        e.preventDefault()
        const { project_name, project_description } = e.target
        fetch(`${config.API_ENDPOINT}/projects`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            }
            , body: JSON.stringify({
                name: project_name.value,
                description: project_description.value
            })
        })
        .then(res => {
            if (!res.ok) {
                return res.status(400).setState({error: res.message})
            }
            this.props.history.goBack()
        })
    }

    refreshError = () => {
        this.setState({
          error: null,
          errorProjectName: null
        })
    }

    render() {
        return (
            <form className='create_project_form' onSubmit={this.handleSubmitCreateProject}>
                <label>
                    Project Name
                    <input type='text' name='project_name' id='project_name' onFocus={this.refreshError} placeholder='Project Name' required></input>
                </label>
                {this.state.errorProjectName && <p className="form_error">{this.state.errorProjectName}</p>}
                <label>
                    Description
                    <input type='text' name='project_description' id='project_description' placeholder='Description' required></input>
                </label>
                <button type='submit' className='submit_button'>Submit</button>
            </form>
        )
    }
}