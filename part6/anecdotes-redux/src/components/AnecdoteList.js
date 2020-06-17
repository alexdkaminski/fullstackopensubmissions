import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state)
  const anecdotesSorted = sortByVotes(anecdotes)
  return (
    <div>
      {anecdotesSorted.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            dispatch(voteAnecdote(anecdote.id))
          }
        />
      )}
    </div>
  )
}

export default AnecdoteList