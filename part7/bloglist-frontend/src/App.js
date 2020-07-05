import React, { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import storage from './utils/storage'

import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser, setUser } from './reducers/userReducer'
import './App.css'


const App = (props) => {
  const dispatch = useDispatch()
  // Destrucutre setUser so it can be used in useEffect() hook
  const { setUser } = props

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [setUser])

  // const sortByLikes = (blogs) => {
  //   const sorted = blogs.sort((a,b) => {
  //     return b.likes - a.likes
  //   })
  //   return sorted
  // }

  // const updateBlog = async (id, blogObject) => {
  //   try {
  //     const returnedBlog = await blogService.update(id, blogObject)
  //     returnedBlog.user = user
  //     console.log('returnedBlog: ',returnedBlog)
  //     let updatedBlogs = blogs.map(blog => blog.id !== id ? blog : returnedBlog)
  //     let sortedBlogs = sortByLikes(updatedBlogs)
  //     setBlogs(sortedBlogs)
  //   } catch (error) {
  //     setErrorMessage(
  //       `Blog '${blogObject.title}' was already removed from server`
  //     )
  //     console.log(error)
  //     setTimeout(() => {
  //       setErrorMessage(null)
  //     }, 5000)
  //   }
  // }

  // const deleteBlog = async (id) => {
  //   let blog = blogs.filter(blog => blog.id === id)[0]
  //   if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
  //     try {
  //       await blogService.deleteBlog(id)
  //       let updatedBlogs = blogs.filter(blog => blog.id !== id)
  //       let sortedBlogs = sortByLikes(updatedBlogs)
  //       setBlogs(sortedBlogs)
  //     } catch (error) {
  //       setErrorMessage(
  //         `An error occured: ${error}`
  //       )
  //       console.log(error)
  //       setTimeout(() => {
  //         setErrorMessage(null)
  //       }, 5000)
  //     }
  //   }
  // }

  const handleLogout = async () => {
    // Set user state to null
    props.logoutUser()
    // Remove user from local storage
    storage.logoutUser()
  }

  return (
    <div>
      {!props.user ?
        <div>
          <h2>Login</h2>
          <Notification/>
          <LoginForm/>
        </div>:
        <div>
          <h2>Blogs</h2>
          <Notification/>
          <div>
            <p>{props.user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
          </div>
          <BlogForm/>
          <BlogList/>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logoutUser,
  setUser
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp