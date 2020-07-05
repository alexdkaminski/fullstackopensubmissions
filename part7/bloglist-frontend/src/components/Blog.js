import React from 'react'
import { connect } from 'react-redux'
import { useRouteMatch } from 'react-router'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const Blog = ({ blogs, user, likeBlog, deleteBlog }) => {
  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null

  if (!blog) {
    return null
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <a href={blog.url}>{blog.url}</a>
      <div>likes <span className="blogLikes">{blog.likes}</span>
        <LikeButton 
          addLike={() => {
            console.log('clicked like button')
            likeBlog(blog.id)
            setNotification(`You liked '${blog.title}'`, 5)
          }}
        />
        {blog.user.username === user.username &&
          <div><DeleteButton deleteClick={() => {
            deleteBlog(blog.id)
          }}/></div>}
      </div>
      <p>Added by {blog.user.name}</p>
    </div>
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
