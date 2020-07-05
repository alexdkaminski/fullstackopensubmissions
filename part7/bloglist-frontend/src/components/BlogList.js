import React from 'react'
import { connect } from 'react-redux'
import Toggleable from './Togglable'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
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
        {blog.title} {blog.author}
        <Toggleable buttonLabel='view' hideLabel='hide'>
          <div className="blogUrl">{blog.url}</div>
          <div>likes <span className="blogLikes">{blog.likes}</span>
            <LikeButton addLike={addLike}/>
          </div>
          <div className="blogAuthor">{blog.author}</div>
          {blog.user.username === user.username &&
            <div><DeleteButton deleteClick={deleteBlog}/></div>}
        </Toggleable>
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
          user={props.user}
          addLike={() => {
            console.log('clicked like button')
            props.likeBlog(blog.id)
            props.setNotification(`You liked '${blog.title}'`, 5)
          }}
          deleteBlog={() => {
            console.log('clicked delete button')
            props.deleteBlog(blog.id)
          }}
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