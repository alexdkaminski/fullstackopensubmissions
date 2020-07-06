import React from 'react'
import { connect } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import CommentForm from '../components/CommentForm'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Container, Typography, Link, Box, Grid } from '@material-ui/core'


const Blog = ({ blogs, user, likeBlog, deleteBlog }) => {
  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null
  const history = useHistory()

  if (!blog) {
    return null
  }

  return (
    <Container style={{ marginTop: 40 }}>
      <Typography variant="h4">{blog.title} - <Box component="span" fontWeight="fontWeightLight">{blog.author}</Box></Typography>
      <Typography component="span" variant="h6" style={{paddingRight:10}}>{blog.likes} Likes</Typography>      <Link  color="inherit" href={blog.url}>{blog.url}</Link>
      <div>
        <LikeButton
          addLike={() => {
            console.log('clicked like button')
            likeBlog(blog.id)
            setNotification(`You liked '${blog.title}'`, 5, 'success')
          }}
        />
        <DeleteButton
          deleteClick={() => {
            if (window.confirm(`Are you sure you want to delete '${blog.title}'?`)) {
              deleteBlog(blog.id)
              history.push('/')
            }
          }
          }/>
      </div>
      {blog.user.username === user.username &&
        <div>

        </div>
      }
      <Box style={{ marginTop: 20 }}>
        <Typography variant="h6">Comments</Typography>
        <CommentForm blog={blog}/>
        <ul>
          {blog.comments.map(comment => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </Box>
      <p>Added by {blog.user.name}</p>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  blogs: state.blogs,
  user: state.user
})

const mapDispatchToProps = {
  likeBlog,
  setNotification,
  deleteBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
