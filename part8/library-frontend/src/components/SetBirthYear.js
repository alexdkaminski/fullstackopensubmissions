import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const SetBirthYear = ({ setError, authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    
    editAuthor({ variables: { name, born }})

    setName('')
    setBorn('')
  }

  return (
    <>
      <h3>Set birth year</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map(a =>
              <option value={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            type="number"
            onChange={({ target }) => setBorn(target.valueAsNumber)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </>
  )
}

export default SetBirthYear