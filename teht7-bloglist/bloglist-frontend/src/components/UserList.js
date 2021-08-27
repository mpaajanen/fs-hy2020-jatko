import React from 'react'
import User from './User'
import { Table } from 'react-bootstrap'

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          {/* {blogs.map(blog => */}
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <User key={user.id} user={user} />
                {/* <Blog key={blog.id} blog={blog} addLike={handleLike} handleRemove={handleRemove} user={user} /> */}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList