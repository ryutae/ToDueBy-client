import React from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'

export default class LoginForm extends React.Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }
  state = { error: null }
  handleLogin = e => {
    e.preventDefault()
    this.setState({ error: null })
    const { email, password } = e.target
    fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      authorization: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      })
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
    .then(res => {
      TokenService.saveAuthToken(res.authToken)
      return res
    })
    .then(res => {
      email.value = ''
      password.value = ''
      this.props.onLoginSuccess()
    })
    .catch(res => {
      this.setState({ error: res.error })
    })
  }
  render() {
    const { error } = this.state
    return (
      <form onSubmit={this.handleLogin}>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <input type='email' name='email' id='email' placeholder='Email' required></input>
        <input type='password' name='password' id='password' placeholder='Password' required></input>
        <button type='submit'>Login</button>
        <button onClick={this.demoUserLogin}>
          Demo User
        </button>
      </form>
    )
  }
}
