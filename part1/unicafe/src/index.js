import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <p>{props.text} {props.statistic}</p>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)

  return (
    <div>
      <h2>Give feedback</h2>
      <Button
        handleClick={goodClick}
        text='Good'
      />
      <Button
        handleClick={neutralClick}
        text='Neutral'
      />
      <Button
        handleClick={badClick}
        text='Bad'
      />
      <h2>Statistics</h2>
      <Statistic
        text='Good'
        statistic={good}
      />
      <Statistic
        text='Neutral'
        statistic={neutral}
      />
      <Statistic
        text='Bad'
        statistic={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)