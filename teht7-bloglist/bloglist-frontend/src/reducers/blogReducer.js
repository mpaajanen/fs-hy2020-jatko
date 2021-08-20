import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INCREMENT':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data
    )
  case 'CREATE':
    return [...state, action.data]
  case 'REMOVE':
    return state.filter(blog =>
      blog.id === action.data.id ? null : blog
    )
  case 'GET_BLOGS':
    return action.data
  default:
    return state
  }
}

export const addLike = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch({
      type: 'INCREMENT',
      data: updatedBlog
    })
  }
}

export const addBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    const id = blog.id
    const removedBlog = await blogService.del(id)
    dispatch({
      type: 'REMOVE',
      data: removedBlog
    })
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs
    })
  }
}

export default reducer