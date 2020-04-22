import React from 'react';

const FindCountries = ( {filter, handleFilterChange}) => {
  return (
    <p>find countries <input value={filter} onChange={handleFilterChange}/></p>
  )
}

export default FindCountries