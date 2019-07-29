import React from 'react'

export default class LoginForm extends React.Component {
  render() {
    return (
      <form>
          <input name='login-email' id='login-email' placeholder='Email' required></input>
          <input name='login-password' id='login-password' placeholder='Password'></input>
      </form>
    )
  }
}
