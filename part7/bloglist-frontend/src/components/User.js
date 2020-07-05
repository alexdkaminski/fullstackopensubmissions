import React from 'react'
import { useRouteMatch } from 'react-router'
import { connect } from 'react-redux'
import blogs from '../services/blogs'

const Title = ({ user }) => {
  return (
    <>
      { user ? <h3>{user.name}</h3> : ''}
      <h4>Added blogs</h4>
    </>
  )
}

const UserBlog = ({ blog }) => {
  return (
    <>
      { blog ? <li>{blog.title}</li> : ''}
    </>
  )
}

const UserBlogList = ({ users }) => {
  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
  ? users.find(u => u.id === userMatch.params.id)
  : null

  if (!user) {
    return null
  }

  return (
    <>
      <Title user={user}/>
      <ul>
        {user.blogs.map(blog => 
          <UserBlog
            key={blog.id}
            blog={blog}
          />
        )}
      </ul>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

// const mapDispatchToProps = {
  
// }

const ConnectedUserBlogList = connect(
  mapStateToProps,
  null
)(UserBlogList)


export default ConnectedUserBlogList