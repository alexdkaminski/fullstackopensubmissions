import React, {useState} from 'react';
import Weather from './Weather'
import { render } from '@testing-library/react';

const ListCountries = ( {filteredCountries, filter}) => {
  const [showSingleCountry, setShowSingleCountry] = useState(false)
  const checkShowSingleCountry = () => {
  if (filteredCountries.length === 1) {
    setShowSingleCountry(true)
  }
  }

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
  } else if (filteredCountries.length === 1) {
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
          <img src={country.flag} alt={`${country.name} flag`} width="200px"/>
          <h4>Weather in {country.name}</h4>
          <Weather capital={country.capital} showSingleCountry={showSingleCountry}/>
        </div>
        )}
      </>
    )
  } else {
    return(
      <>
      </>
    )
  }
}

export default ListCountries