import React, { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
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
import storage from './utils/storage'

import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser, setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import './App.css'


const App = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    // Initialize blogs
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogout = async () => {
    // Set user state to null
    props.logoutUser()
    // Remove user from local storage
    storage.logoutUser()
  }

  return (
    <div>
      <Switch>
        <Route path="/login">
          <div>
            <h2>Login</h2>
            <Notification/>
            <LoginForm/>
          </div>
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
          {props.user ?
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
            : <Redirect to="/login"/>}
        </Route>
      </Switch>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users
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