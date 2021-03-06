const initialState = {
  message: null,
  type: 'success'
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, type) => {
  console.log(message, type);
  
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message,
        type
      }
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer