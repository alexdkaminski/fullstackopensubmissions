import React from 'react'

const DeleteButton = ( {id, handleDelete} ) => {
  return(
    <button id={id} onClick={handleDelete}>delete</button>
  )
}

export default DeleteButton