import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogout } from '../reducers/authReducer'

const Navbar = (props) => { 
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav__items">
          <a className="nav__logo" href="/">Vuokra</a>
          <li className="nav__item"><a href="/">etusivu</a></li>
          <li className="nav__item"><a href="/">hae</a></li>
          <li className="nav__item"><a href="/">jätä ilmoitus</a></li>
        </ul>
        {!props.user && <ul className="nav__items nav__items-actions">
          <li className="nav__item"><Link to="/login">kirjaudu</Link></li>
          <li className="nav__item"><Link to="/register">rekiströidy</Link></li>
        </ul>}
        {props.user && <ul className="nav__items nav__items-actions">
          <li className="nav__item"><Link to="/" onClick={() => props.setVisible(true)}>omat tiedot</Link></li>
        </ul>}
      </nav>
    </header>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToState = {
  userLogout
}

export default connect(mapStateToProps, mapDispatchToState)(Navbar)
