import React from 'react'
import ProjectContext from '../../contexts/ProjectContext';
import config from '../../config';
import TokenService from '../../services/token-service';

export default class UpdateProject extends React.Component {
    static contextType = ProjectContext
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            error: null
        }
    }
 

    componentDidMount() {
        const { project_id } = this.props.match.params
        fetch(`${config.API_ENDPOINT}/projects/${project_id}`, {
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
            this.setState({
                name: resJson.name,
                description: resJson.description
            })
        })
        .catch(error => {
            this.setState({error: 'Something went wrong'})
        })
    }
        

    handleUpdateProject = e => {
        e.preventDefault()
        const { project_id } = this.props.match.params
        const { name, description } = this.state

        fetch(`${config.API_ENDPOINT}/projects/${project_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                name: name,
                description: description
            })
        })
        // .then(res =>
        //     (!res.ok)
        //         ? res.json().then(e => Promise.reject(e))
        //         : res.json()
        // )
        .then(() => {
            this.context.updateProject({name, description})
        })
    }

    handleChangeName = name => {
        //controlled form
        this.setState({name: name})
    }

    handleChangeDescription = description => {
        // controlled form
        this.setState({description: description})
    }


    render() {
        const { name, description } = this.state
        return (
            <div className='update-project'>
                <h1>Update Project</h1>
                <form onSubmit={this.handleUpdateProject}>
                    <label>
                        Project Name
                        <input id='name' name='name' placeholder='Project Name' value={name} required onChange={e => this.handleChangeName(e.target.value)}/>
                    </label>
                    <label>
                        Description
                        <input id='description' name='description' placeholder='Description' value={description} required onChange={e => this.handleChangeDescription(e.target.value)}/>
                    </label>
                    <div className='buttons_container'>
                        <button type='submit' className='edit_button'>Update</button>
                        <button onClick={() => this.props.history.goBack()} className='back_button'>
                            Back
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}