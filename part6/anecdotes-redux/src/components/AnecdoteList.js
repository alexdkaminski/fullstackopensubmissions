import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

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
const AnecdoteList = (props) => {
  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            props.voteAnecdote(anecdote.id)
            props.setNotification(`You voted for '${anecdote.content}'`, 5)
          }
          }
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  const sortByVotes = (anecdotes) => {
    const sorted = anecdotes.sort((a,b) => {
      return b.votes - a.votes
    })
    return sorted
  }

  if (state.filter === '') {
    return {
      anecdotes: state.anecdotes
    }
  }
  return {
    anecdotes: sortByVotes(state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes