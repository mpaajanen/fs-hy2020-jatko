const reducer = (state = null, action) => {
  switch (action.type){
    case 'ON':
      console.log('on')
      return action.message
    case 'OFF':
      console.log('off')
      return action.message
    default:
      return state
  }
}

export const notificationOnVoted = (id, anecdotes) => {
  const anecdoteVoted = anecdotes.find(n => n.id === id)
  return {
    type: 'ON',
    message: `You voted "${anecdoteVoted.content}".`
  }
}

export const notificationOnAdded = (content) => {
  return {
    type: 'ON',
    message: `You added "${content}".`
  }
}

export const notificationOff = () => {
  return {
    type: 'OFF',
    message: null
  }
}

export default reducer