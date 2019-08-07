import React from 'react'
import ProjectListContext from '../../contexts/ProjectListContext'
import TokenService from '../../services/token-service'
import ProjectListItem from '../ProjectListItem/ProjectListItem'
import config from '../../config'
export default class ProjectList extends React.Component {
    static contextType = ProjectListContext

    componentDidMount() {
        this.context.clearError()
        fetch(`${config.API_ENDPOINT}/projects`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
        .then(this.context.setProjectList)
        .catch(this.context.setError)
    }

    renderProjects() {
        const { projectList = [] } = this.context
        return projectList.map(project => 
            <ProjectListItem
                key={project.id}
                project={project}
            />
        )
    }

    render() {
        const { error } = this.context
        return (
            <section list className='ProjectList'>
            {error
                ? <p className='red'>There was an error, try again</p>
                : this.renderProjects()}
            </section>
        )
    }
}