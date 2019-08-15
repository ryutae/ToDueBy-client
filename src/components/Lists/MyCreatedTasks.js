import React from 'react'
import TaskList from '../TaskList/TaskList';
import config from '../../config';
import TokenService from '../../services/token-service';

export default class MyCreatedTasks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myCreatedTasks: []
        }
    }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/users/mycreatedtasks`, {
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
                myCreatedTasks: resJson
            })
        })
    }

    render() {
        const myCreatedTasks = this.state.myCreatedTasks
        return (
            <div className='tasklist'>
                <h2>
                    My Created Tasks
                </h2>
                <TaskList tasks={myCreatedTasks} />
                <button onClick={() => this.props.history.goBack()} className='back_button'>
                    Back
                </button>
            </div>
        )
    }
}