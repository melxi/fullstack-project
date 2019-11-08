import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useField } from '../hooks/'
import { userLogin } from '../reducers/loginReducer'

const LoginForm = (props) => {
  const [email, emailReset] = useField('email')
  const [password, passwordReset] = useField('password')

  const handleSubmit = async event => {
    event.preventDefault()
    
    try {
      await props.userLogin({
        email: email.value,
        password: password.value
      })
  
      emailReset()
      passwordReset()
  
      props.history.push('/')
    } catch(exception) {
      console.log(exception);
    }
  }
  
  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form form--sign-in">
          <h2 className="form__title">Sign in</h2>
          <input className="form__input" {...email} placeholder="Email" />
          <input className="form__input" {...password} placeholder="Password" />
          <Link className="form__link" to="/forgot">Forgot your password?</Link>
          <button className="btn">Sign In</button>
        </form>
          <div className="form-panel form-panel--right">
            <h2 className="form__title">Tervehdys</h2>
            <p className="form__text">Oletko uusi käyttäjä?</p>
            <Link to="/register" className="btn btn--ghost">Rekiströidy</Link>
          </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  userLogin
}

export default connect(null, mapDispatchToProps)(LoginForm)