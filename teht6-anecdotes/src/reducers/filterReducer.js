const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET':
      return action.data.filter
    default:
      return state
    }
}

export const setFilter = (filter) => {
  return {
    type: 'SET',
    data: { filter }
  }
}

export default reducer