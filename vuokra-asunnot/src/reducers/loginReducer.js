import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch(action.type) {
    case 'USER_LOGIN':
      return action.data
    default:
      return state
  }
}

export const userLogin = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    dispatch({
      type: 'USER_LOGIN',
      data: user
    })
    return user
  }
}

export default loginReducer