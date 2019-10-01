import React from 'react'

const Navbar = () => {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav__items">
          <a className="nav__logo" href="/">Vuokra</a>
          <li className="nav__item"><a href="/">etusivu</a></li>
          <li className="nav__item"><a href="/">hae</a></li>
        </ul>
        <ul className="nav__items nav__items-actions">
          <li className="nav__item"><a href="/">kirjaudu</a></li>
          <li className="nav__item"><a href="/">jätä ilmoitus</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
