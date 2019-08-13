import React from 'react'
import LoginForm from '../components/LoginForm/LoginForm'

export default class LoginPage extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/dashboard'
    history.push(destination)
  }

  render() {
    return (
      <section className='LoginPage'>
        <h1>Login Page</h1>
        <LoginForm onLoginSuccess={this.handleLoginSuccess}/>
      </section>
    )
  }
}
