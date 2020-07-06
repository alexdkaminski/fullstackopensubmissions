import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Container, Link, Button, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    textAlign: 'right'
  }
}))

const Navigation = ({ user, logoutUser }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters={true}>
            <Typography variant="h4" color="initial" style={{ paddingRight: 20}}>Blogs App</Typography>
            <Button component={RouterLink} color="inherit" to="/blogs">Blogs</Button>
            <Button component={RouterLink} color="inherit" to="/users">Users</Button>
            { user
              ? <div className={classes.title}><em>{user.name} logged in</em> <Button component={Link} color="inherit" onClick={logoutUser}>logout</Button></div>
              : ''
            }
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {
  logoutUser
}

const ConnectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)

export default ConnectedNavigation