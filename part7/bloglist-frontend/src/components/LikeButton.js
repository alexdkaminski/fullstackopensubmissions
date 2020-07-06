import React from 'react'
import { Button } from '@material-ui/core'

const LikeButton = ( { addLike } ) => {
  return (
    <Button variant="contained" onClick={addLike} style={{ marginTop: 10, marginRight: 10 }}>Like</Button>
  )
}

export default LikeButton