import React from 'react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <nav>
                    This is the nav bar
                </nav>
                <Link to='/home'>
                    <h1>Header</h1>
                </Link>
            </header>
        )
    }
}