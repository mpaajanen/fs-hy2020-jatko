import React, { useState } from 'react'
const Blog = ({ blog, likeAdder, handleRemove, user }) => {
  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    margin: 5
  }
  const [infoVisible, setInfoVisible] = useState(false)

  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setInfoVisible(!infoVisible)
  }

  const addLike = () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    likeAdder(likedBlog, blog.id)
  }

  const removeBlog = () => {
    handleRemove(blog.id)
  }

  return (
    <div style={blogStyle} id="listedBlogs">
      <div style={hideWhenVisible} className='hidden'>
        {blog.title} {blog.author} <button onClick={toggleVisibility} id="view-button">view</button>
      </div>
      <div style={showWhenVisible} className='shown'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button><br />
        {blog.url}<br />
        <div id="likes">
          likes: {blog.likes} <button onClick={addLike} id="like-button">like</button><br />
        </div>
        {blog.user === undefined ? '' : blog.user.name}<br />
        {blog.user.username === user.username ? <button onClick={removeBlog} id="remove-button">remove</button> : ''}
      </div>
    </div>
  )
}

export default Blog
