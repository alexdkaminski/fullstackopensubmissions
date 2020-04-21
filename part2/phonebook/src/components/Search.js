import React from 'react'

const Search = ( {handleSearchChange, search} ) => {

  return (
    <p>filter shown with  <input value={search} onChange={handleSearchChange}/> </p>
  )
}

export default Search