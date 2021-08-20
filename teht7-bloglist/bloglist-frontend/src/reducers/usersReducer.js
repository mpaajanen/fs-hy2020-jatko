import usersService from '../services/users'

const reducer = (state = [], action) => {
  switch(action.type) {
  // case 'CREATE':
  //   return [...state, action.data]
  // case 'REMOVE':
  //   return state.filter(blog =>
  //     blog.id === action.data.id ? null : blog
  //   )
  case 'GET_USERS':
    return action.data
  default:
    return state
  }
}

// export const addBlog = blog => {
//   return async dispatch => {
//     const newBlog = await usersService.create(blog)
//     dispatch({
//       type: 'CREATE',
//       data: newBlog
//     })
//   }
// }

// export const removeBlog = blog => {
//   return async dispatch => {
//     const id = blog.id
//     const removedBlog = await usersService.del(id)
//     dispatch({
//       type: 'REMOVE',
//       data: removedBlog
//     })
//   }
// }

export const getUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: users
    })
  }
}

export default reducer