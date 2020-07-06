import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Grid,
  Paper,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

// Presentational component
const Blog = ({ blog }) => {
  const classes = useStyles()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <Grid item xs={4}>
      <Paper className={classes.paper}>
        <Link style={{color:'#FFF'}} color="inherit" to={`/blogs/${blog.id}`}>{blog.title}</Link><br></br>
        {blog.author}
      </Paper>
    </Grid>
  )
}

// Container component
const BlogList = (props) => {
  return (

    <Grid container spacing={2} style={{ marginTop: 20 }}>
      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </Grid>

  )
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  const sortByLikes = (blogs) => {
    const sorted = blogs.sort((a,b) => {
      return b.likes - a.likes
    })
    return sorted
  }

  return {
    blogs: sortByLikes(state.blogs),
    user: state.user
  }
}

const ConnectedBlogList = connect(
  mapStateToProps
)(BlogList)

export default ConnectedBlogList