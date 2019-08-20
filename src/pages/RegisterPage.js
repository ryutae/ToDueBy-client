import React from 'react'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import './RegisterPage.css'

export default class RegisterPage extends React.Component {
  render() {
    return (
      <section className='RegisterPage'>
        <h1>Register Page</h1>
        <RegisterForm />
      </section>

    )
  }
}
