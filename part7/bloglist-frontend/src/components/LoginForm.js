import React, { useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await props.loginUser(username, password)
    setUsername('')
    setPassword('')
    history.push('/')
    console.log('user logged in')
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

const mapDispatchToProps = {
  loginUser
}

const ConnectedLoginForm = connect(
  null,
  mapDispatchToProps
)(LoginForm)


export default ConnectedLoginForm