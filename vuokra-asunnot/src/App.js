import React from 'react'
import { connect } from 'react-redux'
import { userLogin } from './reducers/loginReducer'
import Navbar from './components/Navbar'
import './App.css'

function App(props) {
  console.log(props)
  
  return (
    <div className="app">
      <Navbar />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  userLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
