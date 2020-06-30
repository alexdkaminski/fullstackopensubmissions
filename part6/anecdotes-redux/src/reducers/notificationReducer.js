export default (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message

    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message: message
    })
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000)
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}