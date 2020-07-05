import React from 'react'
import { connect } from 'react-redux'

// Presentational component
const User = ({ user }) => {
  const blogsCreated = user.blogs.length
  return (
    <div>
      <div>
        {user.name}
      </div>
      <div>
        {blogsCreated}
      </div>
    </div>
  )
}

// Container component
const UserList = (props) => {
  return (
    <div>
      <h2>Users</h2>
      {props.users.map(user =>
        <User
          key={user.id}
          user={user}
        />
      )}
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