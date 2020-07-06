import React, { useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  TextField,
  Button
} from '@material-ui/core'

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
    <form onSubmit={handleSubmit} >
      <div style={{ padding: '0px 20px ' }}>
        <TextField
          label="username"
          id="username"
          type='text'
          name='username'
          value={username}
          fullWidth={true}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div style={{ padding: '10px 20px ' }}>
        <TextField
          label="password"
          id="password"
          type='password'
          name='password'
          value={password}
          fullWidth={true}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div style={{ marginTop:20, padding: '0px 20px' }}>
        <Button variant="contained" type='submit' id="login-button" fullWidth={true}>login</Button>
      </div>
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