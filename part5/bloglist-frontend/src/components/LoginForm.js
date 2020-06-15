import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    await handleLogin(username, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          id="username"
          type='text'
          name='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type='password'
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit' id="login-button">login</button>
    </form>
  )
}

export default LoginForm