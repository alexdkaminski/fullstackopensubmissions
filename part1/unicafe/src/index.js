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
  const [all, setAll] = useState([])

  const goodClick = () => {
    setAll(all.concat(1))
    setGood(good + 1)
  }
  const neutralClick = () => {
    setAll(all.concat(0))
    setNeutral(neutral + 1)
  }

  const badClick = () => {
    setAll(all.concat(-1))
    setBad(bad + 1)
  }

  const getAverage = () => {
    let total = 0;
    if (all.length) {
      for (let i = 0; i < all.length; i++) {
        total += all[i];
      }
      let avg = total / all.length;
      return avg
    }
  }

  const getPositive = () => {
    let total = all.length;
    let positiveTotal = 0;
    if (all.length) {
      for (let i = 0; i < all.length; i++) {
        if (all[i] === 1) {
          positiveTotal += 1;
        }
      }
      let percentagePositive
      percentagePositive = positiveTotal / total * 100;
      return (`${percentagePositive}%`)
    }
  }

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
      <Statistic
        text='All'
        statistic={all.length}
      />
      <Statistic
        text='Average'
        statistic={getAverage()}
      />
      <Statistic
        text='Positive'
        statistic={getPositive()}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)