import React, { useEffect, useRef, useState } from 'react'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import './Weather.css'
const Weather = () => {
  const [weatherReport, setWeatherReport] = useState(false);
  const inputRef = useRef()
  const allIcons = {
    "Old": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }
  const getData = async (city) => {
    if (city == "") {
      alert("Enter city name")
    }

    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`);
      const data = await res.json();
      if (!res.ok) {
        alert(data.message)
        return
      }

      console.log(data)
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherReport({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temprature: Math.floor(data.main.temp),
        city: data.name,
        icon: icon,
        description:data.weather[0].description,
      })
    } catch (e) {
      setWeatherReport(false)
      console.error("Error fetching weather data")
    }

  }

  useEffect(() => {
    getData("london")
  }, [])

  return (
    <div className='weather'>
      <div className="search-bar">
        <input type="text" placeholder='Search' ref={inputRef} />
        <img src={search_icon} alt="" onClick={() => { getData(inputRef.current.value) }} />
      </div>
      <img src={weatherReport.icon} alt="icon" className='weather-icon' />
      <p className='temprature'> {weatherReport.temprature}ºC</p>
      <p className='desc'> {weatherReport.description}</p>
      <p className='city'>{weatherReport.city}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherReport.humidity}%</p>
            <span>Huminidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherReport.windSpeed}Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather