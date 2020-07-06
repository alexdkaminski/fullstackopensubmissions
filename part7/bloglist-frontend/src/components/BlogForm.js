import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import {
  TextField,
  Button
} from '@material-ui/core'


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
    props.setNotification(`Blog ${title} created`, 5, 'success')
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="title"
            id='title'
            value={title}
            required
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label='author'
            id='author'
            value={author}
            required
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label='url'
            id='url'
            value={url}
            required
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button style={{margin: '20px 0px'}} variant="contained" color="primary" type="submit">save</Button>
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