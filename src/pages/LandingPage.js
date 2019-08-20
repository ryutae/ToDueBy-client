import React from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className='landing_page'>
        <div className='landing_page_text'>
          <p className='page_header'>Manage your team's projects and tasks</p>
          <p className='sub_header'>
            <Link to='/register'>
              <span className='langing_page_links'>Register a user</span>
            </Link> and
            <Link to='/login'>
              <span className='langing_page_links'> login</span>
            </Link>
          </p>
        </div>

      </div>

    )
  }
}
