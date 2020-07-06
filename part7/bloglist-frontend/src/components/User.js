import React from 'react'
import { useRouteMatch } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Typography, Container, Link } from '@material-ui/core'

const UserBlog = ({ blog }) => {
  return (
    <>
      { blog ? <li><Link color="inherit" component={RouterLink} to={`/blogs/${blog.id}`}>{blog.title}</Link></li> : ''}
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
    <Container>
      <div style={{marginTop:40}}>
      { user ? <Typography variant="h4" style={{marginBottom: 10}}>{user.name}</Typography> : ''}

      <Typography variant="h6">Added blogs</Typography>
      <ul>
        {user.blogs.map(blog => 
          <UserBlog
            key={blog.id}
            blog={blog}
          />
        )}
      </ul>
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const ConnectedUserBlogList = connect(
  mapStateToProps,
  null
)(UserBlogList)


export default ConnectedUserBlogList