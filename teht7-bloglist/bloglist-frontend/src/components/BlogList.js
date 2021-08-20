import React from 'react'
import { useDispatch } from 'react-redux'
import { removeBlog, addLike } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'

const BlogList = ({ blogs, user }) => {
  const dispatch = useDispatch()

  const handleLike = (likedBlog) => {
    dispatch(addLike(likedBlog))
    dispatch(setNotification(`${likedBlog.title} was liked`, 5))
  }

  const handleRemove = (id) => {
    const blogToBeRemoved = blogs.find(n => n.id === id)
    if(window.confirm('Remove blog?')) {
      dispatch(removeBlog(blogToBeRemoved))
      dispatch(setNotification(`${blogToBeRemoved.title} was removed`, 5))
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={handleLike} handleRemove={handleRemove} user={user} />
      )}
    </div>
  )
}

export default BlogList