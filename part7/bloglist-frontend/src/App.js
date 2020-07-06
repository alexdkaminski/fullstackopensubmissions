import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Blog from './components/Blog'
import User from './components/User'
import Navigation from './components/Navigation'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'

import Container from '@material-ui/core/Container'
import { Typography, CssBaseline, Paper } from '@material-ui/core'

import { ThemeProvider } from '@material-ui/styles'
import darkTheme from './theme'
import './App.css'


const App = ({ initializeBlogs, initializeUsers, user }) => {

  useEffect(() => {
    // Initialize blogs
    initializeBlogs()
    // Initialize users
    initializeUsers()
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      { user ?
        <Navigation/>
        : ''
      }
      <Switch>
        <Route path="/login">
          <Container maxWidth="xs">
            <Paper style={{ padding: '40px 20px', marginTop: 40, textAlign: 'center' }} >
              <div>
                <Typography variant="h4">Login</Typography>
                <Notification/>
                <LoginForm/>
              </div>
            </Paper>
          </Container>
        </Route>
        <Route path="/blogs/:id">
          <Blog/>
        </Route>
        <Route path="/users/:id">
          <User/>
        </Route>
        <Route path="/users">
          <UserList/>
        </Route>
        <Route path="/">
          {user ?
            <Container>
              <h2>Blogs</h2>
              <Notification/>
              <BlogForm/>
              <BlogList/>
            </Container>
            : <Redirect to="/login"/>}
        </Route>
      </Switch>
    </ThemeProvider>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp