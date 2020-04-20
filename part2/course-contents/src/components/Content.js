import React from 'react'
import Part from './Part'
import Total from'./Total'

const Content = ({ parts }) => {
  return (
    <>
      <ul>
      {parts.map((part) =>
        <Part key={part.id} part={part} />
        )}
      </ul>
      <Total parts={parts}/>
    </>
  )
}

export default Content