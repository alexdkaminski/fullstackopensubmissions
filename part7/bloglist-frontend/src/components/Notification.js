import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  if (notification.message === '') {
    return null
  }

  return (
    <Alert severity={notification.severity} style={{margin:10}}>
      {notification.message}
    </Alert>
  )
}

export default Notification