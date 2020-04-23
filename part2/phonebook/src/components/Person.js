import React from 'react'
import DeleteButton from './DeleteButton'

const Person = ( {person, handleDelete} ) => {
  return (
    <li>
      {person.name} {person.number} <DeleteButton id={person.id} handleDelete={handleDelete}/>
    </li>
  )
}

export default Person