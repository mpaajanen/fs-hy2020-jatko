import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  const username = user.username
  const blogsAdded = user.blogs.length
  return (
    <div>
      <Link to={`/users/${user.id}`}>
        {username}
      </Link>
      &nbsp;[ blogs added: {blogsAdded} ]
    </div>
  )
}

export default User