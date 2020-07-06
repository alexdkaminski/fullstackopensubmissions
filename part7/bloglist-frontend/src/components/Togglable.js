import React, { useState, useImperativeHandle } from 'react'
import {
  Button
} from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  Togglable.displayName = 'Toggleable'

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" onClick={toggleVisibility} >{props.buttonLabel}</Button>
      </div>
      <div className="blogDetails" style={showWhenVisible}>
        {props.children}
        <Button variant="outlined" onClick={toggleVisibility}>{props.hideLabel}</Button>
      </div>
    </div>
  )
})

export default Togglable