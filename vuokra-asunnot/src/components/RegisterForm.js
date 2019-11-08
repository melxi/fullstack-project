import React from 'react'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
  return (
    <div className="container">
      <div className="form-container">
        <form className="form form--sign-up">
          <h2 className="form__title">Luo tili</h2>
          <input className="form__input" type="email" placeholder="Email" />
          <input className="form__input" type="text" placeholder="Etunimi" />
          <input className="form__input" type="text" placeholder="Sukunimi" />
          <input className="form__input" type="password" placeholder="Salasana" />
          <button className="btn">Rekiströidy</button>
        </form>
        <div className="form-panel form-panel--left">
          <h2 className="form__title">Welcome Back!</h2>
          <p>To keep connected with us please login with your personal info</p>
          <Link to="/login" className="btn btn--ghost">Sign In</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
