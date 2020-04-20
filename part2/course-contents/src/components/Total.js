import React from 'react'

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((prev, cur) => prev + cur.exercises, 0);
  return (
    <p>
      {totalExercises}
    </p>
  )
}

export default Total