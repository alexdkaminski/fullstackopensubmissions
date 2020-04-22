import React from 'react';

const ListCountries = ( {filteredCountries, filter}) => {
  console.log(filteredCountries)
  console.log(filteredCountries.length)
  if (filteredCountries.length > 10 ) {
    return(
    <p>Too many matches, specify another filter</p>
    )
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return(
      <ul>
      {filteredCountries.map(country =>
        <li key={country.numericCode}>{country.name}</li>
      )}
      </ul>
    )
  } else {
    return(
      <>
        {filteredCountries.map(country =>
        <div key={country.numericCode}>
          <h2>{country.name}</h2>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h4>Languages</h4>
          <ul>
          {country.languages.map(language =>
            <li key={language.iso639_1}>{language.name}</li>
          )}
          </ul>
          <img src={country.flag} width="200px"/>
        </div>
        )}
      </>
    )
  }
}

export default ListCountries