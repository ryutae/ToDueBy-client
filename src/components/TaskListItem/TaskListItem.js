import React from 'react'
import { Link } from 'react-router-dom'

export default class TaskListItem extends React.Component {
    render() {
        const { task } = this.props
        return (
            <Link to={`/project/${task.project_id}/task/${task.id}`}>
                <div className='TaskListItem'>
                    {task.name} - {task.description}
                </div>
            </Link>
        )
    }
}