import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( sortByLikes(blogs) )
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortByLikes = (blogs) => {
    const sorted = blogs.sort((a,b) => {
      return b.likes - a.likes
    })
    return sorted
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updateBlog = async (id, blogObject, blogUser) => {
    try {
      console.log('blogUser: ',blogUser)
      const returnedBlog = await blogService.update(id, blogObject)
      returnedBlog.user = blogUser
      console.log('returnedBlog: ',returnedBlog)
      let updatedBlogs = blogs.map(blog => blog.id !== id ? blog : returnedBlog)
      let sortedBlogs = sortByLikes(updatedBlogs)
      setBlogs(sortedBlogs)
    } catch (error) {
      setErrorMessage(
        `Blog '${blogObject.title}' was already removed from server`
      )
      console.log(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    let blog = blogs.filter(blog => blog.id === id)[0]
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(id)
        let updatedBlogs = blogs.filter(blog => blog.id !== id)
        let sortedBlogs = sortByLikes(updatedBlogs)
        setBlogs(sortedBlogs)
      } catch (error) {
        setErrorMessage(
          `An error occured: ${error}`
        )
        console.log(error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const handleLogin = async (username, password) => {
    // Try to login user and set user state
    try {
      // Login
      const user = await loginService.login({
        username, password,
      })
      // Set local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      // Set token
      blogService.setToken(user.token)
      // Set user state
      setUser(user)
      // Clear username and password
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    // Set user state to null
    setUser(null)
    // Remove user from local storage
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <div>
      {user === null ?
        <div>
          <h2>Login</h2>
          <Notification errorMessage={errorMessage} successMessage={successMessage}/>
          <Togglable buttonLabel='login' hideLabel='cancel'>
            <LoginForm
              handleLogin={handleLogin}
            />
          </Togglable>
        </div>:
        <div>
          <h2>Blogs</h2>
          <Notification errorMessage={errorMessage} successMessage={successMessage}/>
          <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
            <BlogForm
              createBlog={createBlog}
            />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
          )}
        </div>
      }
    </div>
  )
}

export default App