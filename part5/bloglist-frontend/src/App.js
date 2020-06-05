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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
        .then(blogs =>
          setBlogs( blogs )
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

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTitle('')
        setAuthor('')
        setUrl('')
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

  const handleLogin = async (event) => {
    event.preventDefault()
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
      setUsername('')
      setPassword('')
    } catch (error) {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }

  const handleLogout = async (event) => {
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
        <Togglable buttonLabel='login'>
          <LoginForm
              handleSubmit={handleLogin}
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
            />
        </Togglable>
      </div>
    :
      <div>
        <h2>Blogs</h2>
        <Notification errorMessage={errorMessage} successMessage={successMessage}/>
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            addBlog={addBlog}
            title={title}
            author={author}
            url={url}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
          />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    }
    </div>
  )
}

export default App