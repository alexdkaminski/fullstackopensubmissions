import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, TextField, Paper } from '@material-ui/core'


const CommentForm = ({ blog, addComment, setNotification }) => {
  const [comment, setComment] = useState('')

  const submitComment = async (e) => {
    e.preventDefault()
    addComment(blog.id, comment)
    setNotification('Comment added', 5, 'success')
    setComment('')
  }

  return (
    <form onSubmit={submitComment}>
      <div style={{maxWidth: '400px'}}>
        <TextField component={Paper}
          style={{padding: 10}}
          fullWidth={true}
          multiline={true}
          rows={3} 
          placeholder="Leave a comment here"
          id='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}/>
      </div>
      <Button variant="contained" type="submit" style={{ marginTop:10, marginBottom:10 }}>submit</Button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    timeoutId: state.timeoutId
  }
}

const mapDispatchToProps = {
  addComment,
  setNotification
}

const ConnectedCommentForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm)

export default ConnectedCommentForm