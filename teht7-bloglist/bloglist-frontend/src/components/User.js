import React from 'react'

const User = ({ user }) => {
  const username = user.username
  const blogsCreated = user.blogs.length
  return (
    <div>
      {username} ... {blogsCreated}
    </div>
  )
}

export default User