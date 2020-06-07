import React from 'react'

const DeleteButton = ( { deleteClick } ) => {
  return (
    <button onClick={deleteClick}>Delete</button>
  )
}

export default DeleteButton