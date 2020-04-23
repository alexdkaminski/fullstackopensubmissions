import React, { useState,useEffect } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(err => console.log(`an error occured: ${err}`))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    // Check if persons name is already added to db
    if (!persons.some(person => person.name === newName)) {
      personService
        // Add person to db
        .createPerson(personObj)
        // Add new person to persons state
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(err => console.log(`an error occured: ${err}`))
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        let id = persons.filter(person => person.name === newName)[0].id
        personService
          .updatePerson(id, personObj)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          })
          .catch(err => console.log(`an error occured: ${err}`))
      }
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleDelete = (e) => {
    let id = parseInt(e.target.id)
    let person = persons.filter(person => person.id === id)[0]
    console.log(person);
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService
      .deletePerson(id)
      .then (response => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(err => console.log(`an error occured: ${err}`))
    }
  }

  const peopleToShow = search === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearchChange={handleSearchChange} search={search}/>
      <h3>Add a new person</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons peopleToShow={peopleToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App