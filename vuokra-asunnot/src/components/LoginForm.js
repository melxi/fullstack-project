import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useField } from '../hooks/'
import { userLogin } from '../reducers/authReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

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
      props.setNotification('email or password incorrect', 'error')
    }
  }
  
  return (
    <div className="container">
      {props.user ? 
      <p className="form__text signed-in">Olet kirjautunut palveluun.</p>
      :
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form form--sign-in">
          <h2 className="form__title">Kirjaudu sisään</h2>
          <Notification />
          <input className="form__input" {...email} placeholder="Sähköposti" />
          <input className="form__input" {...password} placeholder="Salasana" />
          <Link className="form__link" to="/forgot">Unohdtitko salasanan?</Link>
          <button type="submit" className="btn">Kirjaudu</button>
        </form>
          <div className="form-panel form-panel--right">
            <h2 className="form__title">Tervehdys</h2>
            <p className="form__text">Oletko uusi käyttäjä?</p>
            <Link to="/register" className="btn btn--ghost">Rekiströidy</Link>
          </div>
      </div>}
    </div>

  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  userLogin,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
