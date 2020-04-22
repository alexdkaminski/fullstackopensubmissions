import React, {useState, useEffect} from 'react';
import FindCountries from './components/FindCountries'
import ListCountries from './components/ListCountries'
import axios from 'axios'

const App = () => {
  const [countries,setCountries] = useState([])
  const [filter,setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        setCountries(response.data)
        console.log(response.data);
      })
  }, [])

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const filteredCountries = filter === ''
  ? countries
  : countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      <h1>Countries</h1>
      <FindCountries filter={filter} handleFilterChange={handleFilterChange}/>
      <ListCountries filter={filter} filteredCountries={filteredCountries}/>
    </>
  )
}

export default App;
