import React, { useState,useEffect } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/person'
import guidGenerator from './utils/guidGenerator'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)

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
    let guid = guidGenerator()
    const personObj = {
      name: newName,
      number: newNumber,
      id: guid
    }
    // Check if persons name is already added to db
    if (!persons.some(person => person.name === newName)) {
      console.log(personObj);
      personService
        // Add person to db
        .createPerson(personObj)
        // Add new person to persons state
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSuccessMessage(`Added ${personObj.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000);
          setNewName('')
          setNewNumber('')
        })
        .catch(err => console.log(`an error occured: ${err}`))
    } else {
      let person = persons.find(person => person.name === newName)
      updatePerson(person)
    }
  }

  const updatePerson = person => {
    let id = person.id
    // Update person
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
      let changedPerson = { ...person, number: newNumber }
      let name = person.name
      personService
        .updatePerson(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setSuccessMessage(`Updated ${returnedPerson.name}`)
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
          setSuccessMessage(null)
        }, 5000);
        })
        .catch(err => {
          setErrorMessage(`Information of ${name} has already been removed from server`)
          console.log(err)
          setPersons(persons.filter(person => person.id !== id))
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000);

        })
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
    let id = e.target.id
    let person = persons.filter(person => person.id === id)[0]
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
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>
      <Search handleSearchChange={handleSearchChange} search={search}/>
      <h3>Add a new person</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons peopleToShow={peopleToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App