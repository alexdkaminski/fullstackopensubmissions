import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // Try to login user and set user state
    try {
      // Login
      const user = await loginService.login({
        username, password,
      })
      // Set token
      blogService.setToken(user.token)
      console.log(user)
      // Set user state
      setUser(user)
      // Clear username and password
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
    {user === null ?
      <div>
        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    :
      <div>
      <h2>blogs</h2>
          <div>
            <p>{user.name} logged in</p>
          </div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
    }
    </div>
  )
}

export default App