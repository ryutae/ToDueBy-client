import React from 'react'
import { Link } from 'react-router-dom'

export default class ProjectListItem extends React.Component {
    render() {
        const { project } = this.props
        return (
            <Link to={`/project/${project.project_id}`}>
                <div className='ProjectListItem'>
                    <p className='project_title'>
                        {project.name}
                    </p>
                </div>
            </Link>
        )
    }
}