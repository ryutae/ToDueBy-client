import React from 'react'
import { Link } from 'react-router-dom'
import './MenuContent.css'

export default class MenuContent extends React.Component {
    render() {
        return (
            <section className='menu-content'>
                <h3>Menu</h3>
                <ul>
                    <Link to='/dashboard'>
                        <li>Home</li>
                    </Link>
                    <Link to='/mytasks'>
                        <li>My Tasks</li>
                    </Link>
                    <li>Tasks I've Created</li>
                    <li>Tasks I've Completed</li>
                    <li>My Projects</li>
                </ul>
            </section>
        )
    }
}