import React from 'react'
import { Link } from 'react-router-dom'
import ProjectListContext from '../../contexts/ProjectListContext'
import './MenuContent.css'

export default class MenuContent extends React.Component {
    static contextType = ProjectListContext

    renderProjectList() {
        const { projectList } = this.context
        return (
            projectList.map(project => {
                return (
                    <Link to={`/project/${project.project_id}`} key={project.project_id}>
                        <div className='menu_item' key={project.project_id}>
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
                <p className='menu_section_header'>ToDueBy</p>
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
                        <div className='menu_item'>Tasks I've Completed</div>
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