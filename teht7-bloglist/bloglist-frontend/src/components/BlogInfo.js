import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router'
import { setNotification } from '../reducers/notificationReducer'
import { addLike } from '../reducers/blogReducer'
import { removeBlog } from '../reducers/blogReducer'

const BlogInfo = ({ blogs }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)
  const user = useSelector(state => state.user)

  const likeBlog = () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    dispatch(addLike(likedBlog))
    dispatch(setNotification(`${likedBlog.title} was liked`, 5))

  }

  const handleRemove = () => {
    const blogToBeRemoved = blogs.find(n => n.id === id)
    if(window.confirm('Remove blog?')) {
      dispatch(removeBlog(blogToBeRemoved))
      dispatch(setNotification(`${blogToBeRemoved.title} was removed`, 5))
      history.push('/')
    }
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a><br />
      {blog.likes} likes <button onClick={likeBlog} id="like-button">like</button><br />
      added by {blog.user.name}&nbsp;
      {/* {blog.user === undefined ? '' : blog.user.name}<br /> */}
      {blog.user.username === user.username ? <button onClick={handleRemove} id="remove-button">remove</button> : ''}

    </div>
  )
}

export default BlogInfo