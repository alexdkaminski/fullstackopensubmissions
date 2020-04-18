import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {

  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const mostVotes = () => {
    let max = Math.max(...votes)
    let anecdote = anecdotes[votes.indexOf(max)]
    console.log(anecdote)
    return (anecdote)
  }

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const voteClick = () => {
    let newVotes = [...votes];
    newVotes[selected] += 1
    console.log(newVotes);
    setVotes(newVotes)
  }

  const nextClick = () => {
    setSelected(randomIntFromInterval(0,5))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text='vote' handleClick={voteClick}/>
      <Button text='next anecdote' handleClick={nextClick}/>
      <h1>Anecdote with the most votes</h1>
      <p>{mostVotes()}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)