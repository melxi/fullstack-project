import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from './reducers/authReducer'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import UserDetails from './components/UserDetails'
import './App.css'

function App(props) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    props.setUser()
  }, [])
  
  return (
    <div className="app">
      <Router>
        <Navbar setVisible={setVisible}/>
        <Sidebar visible={visible} setVisible={setVisible}/>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/user-details" component={UserDetails} />
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
