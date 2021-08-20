import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  const username = user.username
  const blogsCreated = user.blogs.length
  return (
    <div>
      <Link to={`/users/${user.id}`}>
        {username}&nbsp;
      </Link>
      ... {blogsCreated}
    </div>
  )
}

export default User