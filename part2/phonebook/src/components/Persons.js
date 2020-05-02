import React from 'react'
import Person from './Person'

const Persons = ({showPersons, handleDelete}) => {
  return (
    <ul>
      {showPersons.map(person =>
        <Person key={person.id} person={person} handleDelete={handleDelete}/>
      )}
    </ul>
  )
}

export default Persons
