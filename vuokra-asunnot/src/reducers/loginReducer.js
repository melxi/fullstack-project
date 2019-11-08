import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch(action.type) {
    case 'USER_LOGIN':
      return action.data
    default:
      return state
  }
}

export const setUser = () => {
  return dispatch => {
    let user
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      loginService.setToken(user.token)
    }
    dispatch({
      type: 'USER_LOGIN',
      data: user || null
    })
  }
}

export const userLogin = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    loginService.setToken(user.token)
    console.log(user)
    dispatch({
      type: 'USER_LOGIN',
      data: user
    })
    return user
  }
}

export default loginReducer