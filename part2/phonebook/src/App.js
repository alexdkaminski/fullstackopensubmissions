import React, { useState,useEffect } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const personObj = {
      name: newName,
      phone: newPhone,
      id: persons.length +1
    }
    if (!persons.some(person => person.name === newName)) {
      setPersons(persons.concat(personObj))
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const peopleToShow = search === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearchChange={handleSearchChange} search={search}/>
      <h3>Add a new person</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange}/>
      <h3>Numbers</h3>
      <Persons peopleToShow={peopleToShow}/>
    </div>
  )
}

export default App