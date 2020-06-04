import React from 'react'

const LoginForm = ({ handleSubmit, username, handleUsernameChange, password, handlePasswordChange }) => (
  <form onSubmit={handleSubmit}>
    <div>
      username
      <input
        type='text'
        name='username'
        value={username}
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        type='password'
        name='password'
        value={password}
        onChange={handlePasswordChange}
      />
    </div>
    <button type='submit'>login</button>
  </form>
)

export default LoginForm