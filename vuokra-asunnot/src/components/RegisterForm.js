import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useField } from '../hooks/'
import { userRegister, userLogin } from '../reducers/authReducer'

const RegisterForm = (props) => {
  const [email, resetEmail] = useField('email')
  const [password, resetPassword] = useField('password')
  const [firstName, resetFirstName] = useField('text')
  const [lastName, resetLastName] = useField('text')
  
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await props.userRegister({
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value
      })

      await props.userLogin({
        email: email.value,
        password: password.value
      })

      resetEmail()
      resetPassword()
      resetFirstName()
      resetLastName()

      props.history.push('/')
    } catch(exception) {
      console.log(exception);
    }
  } 

  return (
    <div className="container">
      <div className="form-container">
        <form className="form form--sign-up" onSubmit={handleSubmit}>
          <h2 className="form__title">Luo tili</h2>
          <input className="form__input" {...email} placeholder="Email" />
          <input className="form__input" {...firstName} placeholder="Etunimi" />
          <input className="form__input" {...lastName} placeholder="Sukunimi" />
          <input className="form__input" {...password} placeholder="Salasana" />
          <button className="btn" type="submit">Rekiströidy</button>
        </form>
        <div className="form-panel form-panel--left">
          <h2 className="form__title">Tervetuloa takaisin</h2>
          <p>Kirjaudu palveluun omalla käyttäjätunnuksella</p>
          <Link to="/login" className="btn btn--ghost">Kirjaudu</Link>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  userRegister,
  userLogin
}

export default connect(null, mapDispatchToProps)(RegisterForm)
