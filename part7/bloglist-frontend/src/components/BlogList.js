import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Toggleable from './Togglable'
import LikeButton from './LikeButton'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

// Presentational component
const Blog = ({ blog, user, addLike, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div className="blog" style={blogStyle}>
      <div>
        <div><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
        <div>{blog.author}</div>
      </div>
    </div>
  )
}

// Container component
const BlogList = (props) => {
  return (
    <div>
      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  const sortByLikes = (blogs) => {
    const sorted = blogs.sort((a,b) => {
      return b.likes - a.likes
    })
    return sorted
  }

  return {
    blogs: sortByLikes(state.blogs),
    user: state.user
  }
  // if (state.filter === '') {
  //   return {
  //     anecdotes: state.anecdotes
  //   }
  // }
  // return {
  //   anecdotes: sortByVotes(state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))
  // }
}

const mapDispatchToProps = {
  likeBlog,
  deleteBlog,
  setNotification
}

const ConnectedBlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)

export default ConnectedBlogList