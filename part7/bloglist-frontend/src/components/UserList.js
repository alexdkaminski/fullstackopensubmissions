import React from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Container, Link } from '@material-ui/core'

// Presentational component
const User = ({ user }) => {
  const blogsCreated = user.blogs.length
  return (
    <tr>
      <td>
        <Link component={RouterLink} color="inherit" to={`/users/${user.id}`}>{user.name}</Link>
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
    <Container style={{ marginTop: 40 }}>
      <Typography variant="h5">Users</Typography>
      <table>
        <thead>
          <tr>
          <th>
          
          </th>
          <th>
            Blogs created
          </th>
          </tr>

        </thead>
        <tbody>
          {props.users.map(user =>
            <User
              key={user.id}
              user={user}
            />
          )}
        </tbody>
      </table>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  users: state.users
})

const ConnectedUserList = connect(
  mapStateToProps
)(UserList)

export default ConnectedUserList