import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    if (e.type === "change") {
      setValue(e.target.value)
    } else if (e.type === "reset") {
      setValue('')
    } else {
      console.log(`Unknown event type: ${e.type}`)
    }
  }

  return {
    type: 'text',
    name,
    value,
    onChange
  }
}