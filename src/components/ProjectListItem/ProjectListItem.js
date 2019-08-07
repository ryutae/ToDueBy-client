import React from 'react'
import { Link } from 'react-router-dom'

export default class ProjectListItem extends React.Component {
    render() {
        const { project } = this.props
        return (
            <Link to={`/project/${project.id}`} className='ProjectListItem'>
                {project.name} - {project.description}
            </Link>
        )
    }
}