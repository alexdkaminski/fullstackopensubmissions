import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    //Check if weather is an empty object
    if (Object.entries(weather).length === 0 && weather.constructor === Object){
      axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
    }
  })
  if (Object.entries(weather).length === 0 && weather.constructor === Object) {
    return(
      <>
      </>
    )
  } else {
    return(
      <>
       <p>temperature: {weather.temperature}</p>
       {weather.weather_icons.map(function(icon){
         return <img key={icon} src={icon}/>
       }
       )}
       <p>wind: {weather.wind_speed} mph direction {weather.wind_dir}</p>
      </>
    )
  }
}

export default Weather