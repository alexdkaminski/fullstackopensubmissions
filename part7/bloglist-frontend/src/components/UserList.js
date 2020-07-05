import React from 'react'
import { connect } from 'react-redux'

// Presentational component
const User = ({ user }) => {
  const blogsCreated = user.blogs.length
  return (
    <tr>
      <td>
        {user.name}
      </td>
      <td>
        {blogsCreated}
      </td>
    </tr>
  )
}

// Container component
const UserList = (props) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <th>
          
        </th>
        <th>
          Blogs created
        </th>
          {props.users.map(user =>
            <User
              key={user.id}
              user={user}
            />
          )}
      </table>
    </div>
  )
}

const mapStateToProps = (state) => ({
  users: state.users
})

const ConnectedUserList = connect(
  mapStateToProps
)(UserList)

export default ConnectedUserList