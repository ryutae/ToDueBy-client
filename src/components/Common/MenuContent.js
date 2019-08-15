import React from 'react'
import { Link } from 'react-router-dom'
import './MenuContent.css'
import ProjectListContext from '../../contexts/ProjectListContext'
import config from '../../config';
import TokenService from '../../services/token-service';
export default class MenuContent extends React.Component {
    static contextType = ProjectListContext
    constructor(props) {
        super(props)
        this.state = {
            projectList: [],
            error: null
        }
    }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/projects/`, {
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
                projectList: resJson
            })
        })  
    }

    renderProjectList() {
        const { projectList } = this.state
        return (
            projectList.map(project => {
                return (
                    <Link to={`/project/${project.project_id}`}>
                        <div>
                            {project.name}
                        </div>
                    </Link>
                )
            })
        )
    }

    render() {
        return (
            <section className='menu-content'>
                <h3>Menu</h3>
                <ul>
                    <Link to='/dashboard'>
                        <li>Home</li>
                    </Link>
                    <Link to='/lists/myopentasks'>
                        <li>My Tasks</li>
                    </Link>
                    <Link to='/lists/mycreatedtasks'>
                        <li>Tasks I've Created</li>
                    </Link>
                    <Link to='/lists/mycompletedtasks'>
                        <li>Tasks I've completed</li>
                    </Link>
                    <li>My Projects</li>
                    {this.renderProjectList()}
                </ul>

            </section>
        )
    }
}