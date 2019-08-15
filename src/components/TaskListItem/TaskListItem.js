import React from 'react'
import { Link } from 'react-router-dom'
import './TaskListItem.css'

export default class TaskListItem extends React.Component {
    render() {
        const { task } = this.props
        // add Complete Task button to the item so that it displays on the list
        return (
            <Link to={`/project/${task.project_id}/task/${task.id}`}>
                <div className='TaskListItem'>
                    {task.name} - {task.description}
                </div>
            </Link>
        )
    }
}