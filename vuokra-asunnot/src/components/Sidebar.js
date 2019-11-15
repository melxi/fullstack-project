import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogout } from '../reducers/authReducer'
import userIcon from '../assets/icons/avatar.svg'


const Sidebar = (props) => {
  const hideWhenVisible = { right: props.visible ? '0' : '-250px'}

  const handleClick = () => {
    props.userLogout()
  }

  if (!props.user) return null

  return (
    <div className="sidebar" style={hideWhenVisible}>
      <span className="close" onClick={() => props.setVisible(false)}>&times;</span>
      <div className="user-details">
        <div className="user-details__image">
          <img src={userIcon} alt="avatar"/>
        </div>
        <div className="user-details__name">
          <p>{props.user.firstName} {props.user.lastName}</p>
          <span>{props.user.email}</span>
        </div>
      </div>
      <ul className="user-menu-list">
        <li className="user-menu-list__link">
          <a href="/">Omat tiedot</a>
        </li>
        <li className="user-menu-list__link">
          <a href="/">Omat ilmoitukset</a>
        </li>
        <li className="user-menu-list__link">
          <a href="/">Suosikit</a>
        </li>
        <li className="user-menu-list__link user-menu-list__link--signout">
          <Link to="/login" onClick={handleClick}>kirjaudu ulos</Link>
        </li>
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  userLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)