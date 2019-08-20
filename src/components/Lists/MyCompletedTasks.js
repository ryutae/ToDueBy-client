import React from 'react'
import TaskList from '../TaskList/TaskList';
import config from '../../config';
import TokenService from '../../services/token-service';

export default class MyCompletedTasks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myCompletedTasks: []
        }
    }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/users/mycompletedtasks`, {
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
                myCompletedTasks: resJson
            })
        })
    }

    render() {
        const myCompletedTasks = this.state.myCompletedTasks
        return (
            <div className='tasklist'>
                <p className='page_header'>
                    My Completed Tasks
                </p>
                <TaskList tasks={myCompletedTasks} />
                <button onClick={() => this.props.history.goBack()} className='back_button'>
                    Back
                </button>
            </div>
        )
    }
}