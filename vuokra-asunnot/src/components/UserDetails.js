import React, { useState } from 'react'
import { connect } from 'react-redux'
import { userUpdate } from '../reducers/authReducer'
import { useField } from '../hooks/index'

const UserDetails = (props) => {
  const [email, setEmail] = useField('email')
  const [firstName, resetFirstName] = useField('text')
  const [lastName, resetLastName] = useField('text')
  const [password, resetPassword] = useField('password')
  const [repeatPassword, resetRepeatPassword] = useField('password')
  const [phone, resetPhone] = useField('text')
  const [address, resetAddress] = useField('text')
  const [index, resetIndex] = useField('text')
  const [city, resetCity] = useField('text')
  
  const handleSubmit = event => {
    event.preventDefault()
    props.userUpdate({
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
      address: address.value,
      index: index.value,
      city: city.value
    })
    console.log({
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
      address: address.value,
      index: index.value,
      city: city.value
    })
  }

  if (!props.user) {
    return null
  }

  console.log(props.user)

  return (
    <div className="container">
      <h1 className="title">Omat tiedot</h1>
      <div className="form-container">
        <form className="form form--user-details" onSubmit={handleSubmit}>
          <h2 className="form__title">Yhteystiedot</h2>
          <div className="form__groups">
            <div className="form__group">
              <input className="form__input" type="email" onChange={email.onChange} defaultValue={props.user.email} placeholder="Sähköposti" />
              <input className="form__input" type="text" onChange={firstName.onChange} defaultValue={props.user.firstName} placeholder="Etunimi" />
              <input className="form__input" type="text" onChange={lastName.onChange} defaultValue={props.user.lastName} placeholder="Sukunimi" />
              <input className="form__input" type="text" onChange={phone.onChange} defaultValue={props.user.phone} placeholder="Puhelin" />
            </div>
            <div className="form__group">
              <input className="form__input" type="text" onChange={address.onChange} defaultValue={props.user.address} placeholder="Osoite" />
              <input className="form__input form__input--index" type="text" onChange={index.onChange} defaultValue={props.user.index} placeholder="Postinro" />
              <input className="form__input form__input--city" type="text" onChange={city.onChange} defaultValue={props.user.city} placeholder="Toimipaikka" />
              <button className="btn btn--save" type="submit">Tallena</button>
            </div>
          </div>
        </form>
        <form className="form form--user-password" onSubmit={handleSubmit}>
          <h2 className="form__title">Salasanan vaihto</h2>
          <input className="form__input" {...password} placeholder="Uusi salasana" />
          <input className="form__input" {...repeatPassword} placeholder="Uusi salasana uudelleen" />
          <button className="btn btn--change" type="submit">Vaihda salasana</button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToState = {
  userUpdate
}

export default connect(mapStateToProps, mapDispatchToState)(UserDetails)
