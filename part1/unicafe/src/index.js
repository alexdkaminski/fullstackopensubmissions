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
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  if (props.feedbackGiven) {
    return (
      <>
        <h2>Statistics</h2>
        {
          props.statistics.map((statistic, i) => {
              return (
              <Statistic
                key={i}
                text={statistic.name}
                value={statistic.value}
              />)
        })}
      </>
    )
  } else {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])
  const [feedbackGiven, setFeedback] = useState(false)

  const giveFeedback = () => {
    if (feedbackGiven === false) {
      setFeedback(true);
    }
  }

  const goodClick = () => {
    giveFeedback()
    setAll(all.concat(1))
    setGood(good + 1)
  }
  const neutralClick = () => {
    giveFeedback()
    setAll(all.concat(0))
    setNeutral(neutral + 1)
  }

  const badClick = () => {
    giveFeedback()
    setAll(all.concat(-1))
    setBad(bad + 1)
  }

  const getAll = () => all.length

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
      <Statistics
        statistics={
          [
            {
              name: 'Good',
              value: good
            },
            {
              name: 'Neutral',
              value: neutral
            },
            {
              name: 'Bad',
              value: bad
            },
            {
              name: 'All',
              value: getAll()
            },
            {
              name: 'Average',
              value: getAverage()
            },
            {
              name: 'Positive',
              value: getPositive()
            },
          ]
        }
        feedbackGiven={feedbackGiven}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)