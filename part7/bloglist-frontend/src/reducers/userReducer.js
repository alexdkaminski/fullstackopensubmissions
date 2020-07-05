import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import storage from '../utils/storage'

const initialState = () => {
  const userExists = storage.checkUser()
  return userExists ? storage.loadUser() : null
}

const reducer = (state = initialState(), action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  case 'SET':
    return action.data
  default:
    return state
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      // Login
      const user = await loginService.login({
        username, password
      })
      // Set local storage
      storage.saveUser(user)
      // Dispatch notification
      dispatch(setNotification(`User ${user.name} logged in`, 5))
      // Dispatch login action
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (error) {
      console.log(error)
      dispatch(setNotification(`An error has occured: ${error}`, 5))
    }
  }
}

export const logoutUser = () => (
  {
    type: 'LOGOUT',
  }
)

export const setUser = (user) => (
  {
    type: 'SET',
    data: user
  }
)

export default reducer