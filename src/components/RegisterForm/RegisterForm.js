import React from 'react'
import './RegisterForm.css'
import config from '../../config'

export default class RegisterForm extends React.Component {
  state = {
    error: null,
    errorPassword: null,
    errorFirstName: null,
    errorLastName: null,
    errorEmail: null
  }

  validatePassword = (password) => {
    this.setState({errorPassword: null})
    let result = true
    if(!password) {
      this.setState({errorPassword: "Password is required"})
      result = false
    }
    if (password.length < 8) {
        this.setState({errorPassword: "Password needs to be at least 8 characters"})
        result = false
    }

    if (password.length > 72) {
        this.setState({errorPassword: "Password needs to be less than 72 characters"})
        result = false
    }

    if (password.startsWith(' ') || password.endsWith(' ')) {
      this.setState({errorPassword: 'Password must not start or end with empty spaces'})
      result = false
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/.test(password)) {
      this.setState({errorPassword: 'Password must contain one upper case, lower case, number and special character'})
      result = false
    }

    return result
  }
  
    validateFirstName = (firstName) => {
      let result = true
  
      if(!firstName) {
          this.setState({errorFirstName: "First Name is required"})
          result = false
      }
  
      return result
    }

    validateLastName = (lastName) => {
    let result = true
  
      if(!lastName) {
          this.setState({errorLastName: "Last Name is required"})
          result = false
      }
  
      return result
    }

    validateEmail = (email) => {
      let result = true
      if (!email) {
        this.setState({errorEmail: "Email is required"})
        result = false
      }

      return result
    }

    validateConfirmPassword = (password, confirmPassword) => {
      let result = true
      if (password !== confirmPassword) {
        this.setState({errorPassword: `Confirm Password does not match Password`})
        result = false
      }

      return result
    }

  refreshError = () => {
    this.setState({
      error: null,
      errorPassword: null,
      errorFirstName: null,
      errorLastName: null,
      errorEmail: null
    })
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = ev.target
    if (!this.validateFirstName(firstName.value)) {
      return
    }
    if (!this.validateLastName(lastName.value)) {
      return
    }
    if (!this.validateEmail(email.value)) {
      return
    }
    if (!this.validatePassword(password.value)) {
      return
    }

    if (!this.validateConfirmPassword(password.value, confirmPassword.value)) {
      return
    }
    this.setState({ error: null })
    //submit to API
    fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        password: password.value,
        })
    })
    .then(res => 
      (!res.ok) 
      ? res.json().then(e => Promise.reject(e)) 
      : res.json()
    )
    .then(user => {
      firstName.value = ''
      lastName.value = ''
      email.value = ''
      password.value = ''
      confirmPassword.value = ''
      this.props.history.push('/login')
    })
    .catch(res => {
      this.setState({ error: res.error })
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <input type='text' name='firstName' id='firstName' onFocus={this.refreshError} placeholder='First Name' required></input>
          {this.state.errorFirst && <p className="form-error">{this.state.errorFirst}</p>}
          <input type='text' name='lastName' id='lastName' onFocus={this.refreshError} placeholder='Last Name' required></input>
          {this.state.errorLastName && <p className="form-error">{this.state.errorLastName}</p>}
          <input type='email' name='email' id='email' onFocus={this.refreshError} placeholder='Email' required></input>
          {this.state.errorEmail && <p className="form-error">{this.state.errorEmail}</p>}
          <input type='password' name='password' id='password' onFocus={this.refreshError} placeholder='Password'></input>
          {this.state.errorPassword && <p className="form-error">{this.state.errorPassword}</p>}
          <input type='password' name='confirmPassword' id='confirmPassword' onFocus={this.refreshError} placeholder='Confirm Password'></input>
          <button type='submit'>Register</button>
      </form>
    )
  }
}
