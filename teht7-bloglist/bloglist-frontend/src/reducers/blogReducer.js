import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INCREMENT':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data
    )
  case 'CREATE':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const voteBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog)
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

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default reducer