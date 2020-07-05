import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'


const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = React.createRef()

  const addBlog = async (e) => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    props.createBlog(blogObject)
    props.setNotification(`Note ${title} created`, 5, props.noteId)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </Togglable>
  )
}

const mapStateToProps = (state) => {
  return {
    timeoutId: state.timeoutId
  }
}

const mapDispatchToProps = {
  createBlog,
  setNotification
}

const ConnectedBlogForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm)

export default ConnectedBlogForm