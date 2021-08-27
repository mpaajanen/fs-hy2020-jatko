import React from 'react'
import { useDispatch } from 'react-redux'
import { removeBlog, addLike } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import { Table } from 'react-bootstrap'

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
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Blog key={blog.id} blog={blog} addLike={handleLike} handleRemove={handleRemove} user={user} />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList