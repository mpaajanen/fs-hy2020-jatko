import React from 'react'
import { useParams } from 'react-router'

const userInfo = ({ users }) => {
  const id = useParams().id
  const user = users.find(n => n.id === id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      {user.blogs.map(blog =>
        <li key={blog.id}>
          {blog.title}
        </li>
      )}
    </div>
  )
}

export default userInfo