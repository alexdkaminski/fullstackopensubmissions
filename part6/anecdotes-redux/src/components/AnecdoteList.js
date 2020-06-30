import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

// Presentational component
const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

// Container component
const AnecdoteList = () => {
  const sortByVotes = (anecdotes) => {
    const sorted = anecdotes.sort((a,b) => {
      return b.votes - a.votes
    })
    return sorted
  }
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })
  const anecdotesSorted = sortByVotes(anecdotes)
  return (
    <div>
      {anecdotesSorted.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteAnecdote(anecdote.id))
            dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
          }
          }
        />
      )}
    </div>
  )
}

export default AnecdoteList