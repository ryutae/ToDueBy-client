import React from 'react'

export default class RegisterForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault()
        //submit to API

        //this.history.push('/home')
    }
  render() {
    return (
      <form>
          <input name='register-name' id='register-name' placeholder='Full Name' required></input>
          <input name='register-email' id='register-email' placeholder='Email' required></input>
          <input name='register-password' id='register-password' placeholder='Password'></input>
          <input name='register-confirm-password' id='register-confirm-password' placeholder='Confirm Password'></input>
          <button type='submit' onClick={this.handleSubmit}>Register</button>
      </form>
    )
  }
}
