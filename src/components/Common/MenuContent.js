import React from 'react'
import { Link } from 'react-router-dom'
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
                        <div className='menu_item'>
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
                <i className="fas fa-clipboard-list"></i>
                <h3>ToDueBy</h3>

                <Link to='/dashboard'>
                    <div className='menu_item'>Home</div>
                </Link>
                <Link to='/lists/myopentasks'>
                    <div className='menu_item'>My Tasks</div>
                </Link>
                <div className='menu_section'>
                    <div className='menu_section_header'>Lists</div>
                    <Link to='/lists/mycreatedtasks'>
                        <div className='menu_item'>Tasks I've Created</div>
                    </Link>
                    <Link to='/lists/mycompletedtasks'>
                        <div className='menu_item'>Tasks I've completed</div>
                    </Link>
                </div>    
                <div className='menu_section'>
                    <div className='menu_section_header'>Projects</div>
                    {this.renderProjectList()}
                </div>
                

            </section>
        )
    }
}