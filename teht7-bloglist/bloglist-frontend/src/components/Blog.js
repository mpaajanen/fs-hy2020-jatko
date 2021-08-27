import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  // const blogStyle = {
  //   border: 'solid',
  //   borderWidth: 1,
  //   margin: 5
  // }
  return (
    <div id="listedBlogs">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>
      &nbsp;[ likes: {blog.likes} ]
    </div>
  )
}

export default Blog
