import React from 'react'
import TaskList from '../TaskList/TaskList';
import config from '../../config';
import TokenService from '../../services/token-service';

export default class MyOpenTasks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myOpenTasks: []
        }
    }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/users/myopentasks`, {
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
                myOpenTasks: resJson
            })
        })
    }

    render() {
        const myOpenTasks = this.state.myOpenTasks
        return (
            <div className='tasklist'>
                <p className='page_header'>
                    My Open Tasks
                </p>
                <TaskList tasks={myOpenTasks} />
                <button onClick={() => this.props.history.goBack()} className='back_button'>
                    Back
                </button>
            </div>
        )
    }
}