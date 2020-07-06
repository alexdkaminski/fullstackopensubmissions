import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE_BLOG':
    return state.map(blog =>
      blog.id !== action.data.blog.id ? blog : action.data.blog
    )
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'ADD_COMMENT':
    const blogToUpdate = state.find(blog => blog.id === action.id)
    const updatedBlog = {...blogToUpdate, comments: action.comments}
    return state.map(blog =>
      blog.id === action.id ? updatedBlog : blog
      )
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
    const blogToChange = blogs.find(b => b.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    const updatedBlog = await blogService.update(changedBlog)
    dispatch ({
      type: 'LIKE_BLOG',
      data: {
        blog: updatedBlog
      }
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    console.log(id)
    const blogs = getState().blogs
    const blogToDelete = blogs.find(b => b.id === id)
    console.log(blogToDelete)
    try {
      await blogService.deleteBlog(id)
      dispatch ({
        type: 'DELETE_BLOG',
        data: {
          id: blogToDelete.id
        }
      })
      dispatch(setNotification(`You deleted '${blogToDelete.title}'`, 5))
    } catch(error) {
      dispatch(setNotification(`${error}`, 5))
    }
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog= await blogService.create(content)
    dispatch ({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(id, comment)
    const { comments } = updatedBlog
    dispatch ({
      type: 'ADD_COMMENT',
      id,
      comments
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default reducer