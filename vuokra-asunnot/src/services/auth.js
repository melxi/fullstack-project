import axios from 'axios'
const baseUrl = '/api/auth'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const destroyToken = () => {
  token = null
}

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

const register = async (credentials) => {  
  const response = await axios.post(`${baseUrl}/register`, credentials)
  return response.data
}

export default { setToken, destroyToken, login, register }