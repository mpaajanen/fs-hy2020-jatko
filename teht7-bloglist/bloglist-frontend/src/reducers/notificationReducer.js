const reducer = (state = null, action) => {
  switch (action.type){
  case 'NOTIFY':
    return action.message
  case 'OFF':
    return action.message
  default:
    return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      message: message,
    })
    setTimeout(() => {
      dispatch(notificationOff())
    }, time * 1000)
  }

}

export const notificationOff = () => {
  return {
    type: 'OFF',
    message: null
  }
}

export default reducer