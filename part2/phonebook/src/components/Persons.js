import React from 'react'
import Person from './Person'

const Persons = ({peopleToShow}) => {
  return (
    <ul>
    {peopleToShow.map(person =>
      <Person key={person.id} person={person}/>
    )}
    </ul>
  )
}

export default Persons
