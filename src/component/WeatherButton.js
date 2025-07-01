import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities}) => {
  console.log(cities);

  const [city, setCity] =useState('')

  const searchByCity = (cityName) => {
    setCity(cityName)
    let url = 'api.weather'
  }

  return (
    <div>
      <Button variant="warning">Current Location</Button>

      {cities.map((item)=>(
        <Button variant='warning' onclick={searchByCity}>{item}</Button>
      ))}
    </div>
  )
}

export default WeatherButton