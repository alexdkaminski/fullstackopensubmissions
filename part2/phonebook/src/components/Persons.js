import React from 'react'
import Person from './Person'

const Persons = ({peopleToShow, handleDelete}) => {
  return (
    <ul>
    {peopleToShow.map(person =>
      <Person key={person.id} person={person} handleDelete={handleDelete}/>
    )}
    </ul>
  )
}

export default Persons
