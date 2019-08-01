import React from 'react'

export default class HomePage extends React.Component {
  render() {
    return (
      <div className='home-page'>
        <p className='title'>Home Page</p>
        <h3>Projects</h3>
        <ul>
          <li>Project 1</li>
          <li>Project 2</li>
          <li>Project 3</li>
          <li>Project 4</li>
        </ul>
      </div>
    )
  }
}
