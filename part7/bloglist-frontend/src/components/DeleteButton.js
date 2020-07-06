import React from 'react'
import { Button } from '@material-ui/core'

const DeleteButton = ( { deleteClick } ) => {
  return (
    <Button variant="outlined" onClick={deleteClick} style={{ marginTop: 10 }}>Delete</Button>
  )
}

export default DeleteButton