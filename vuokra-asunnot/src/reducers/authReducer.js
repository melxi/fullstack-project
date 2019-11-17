import authService from '../services/auth'

const authReducer = (state = null, action) => {
  switch(action.type) {
    case 'USER_LOGIN':
      return action.data
    case 'USER_LOGOUT':
      return null
    case 'USER_REGISTER':
      return action.data
    case 'USER_UPDATE':
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
      authService.setToken(user.token)
    }
    dispatch({
      type: 'USER_LOGIN',
      data: user || null
    })
  }
}

export const userLogin = (credentials) => {
  return async dispatch => {
    const user = await authService.login(credentials)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    authService.setToken(user.token)
    dispatch({
      type: 'USER_LOGIN',
      data: user
    })
    return user
  }
}

export const userLogout = () => {
  return async dispatch => {
    authService.destroyToken()
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'USER_LOGOUT'
    })
  }
}

export const userRegister = credentials => {
  return async dispatch => {
    const user = await authService.register(credentials)
    
    dispatch({
      type: 'USER_REGISTER',
      data: user
    })
    return user
  }
}

export const userUpdate = credentials => {
  return async dispatch => {
    const updatedUser = await authService.update(credentials)
    console.log(updatedUser)
    dispatch({
      type: 'USER_UPDATE',
      data: updatedUser
    })
    return updatedUser
  }
}

export default authReducer