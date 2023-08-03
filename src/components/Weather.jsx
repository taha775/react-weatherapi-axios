import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css'
import {FaCity} from 'react-icons/fa'
import {FaShareSquare} from 'react-icons/fa'
import {HiOutlineSun} from 'react-icons/hi'
import clouds from '../assests/clouds.jpeg'
const Weather = () => {
  const [weather, setWeather] = useState([]);
  const [countryName, setCountryName] = useState('');

  const handleInputChange = (event) => {
    setCountryName(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://pro.openweathermap.org/data/2.5/weather?q=${countryName}&appid=3500aa8ab775cb0cb97ead2b9fc41866&units=metric`,
        headers: {
          'Content-Type': 'application/json'
        },
      };

      const response = await axios.request(config);
      setWeather([response.data]);
    } catch (error) {
      console.log('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [countryName]); // Fetch weather data whenever the countryName changes

  return (
    <>
    <h1 className='wel'> <b>WELCOME TO THE PAKISTAN WEATHER APP</b></h1>

      <div className="header">
      <h1 className='city'>ENTER YOUR CITY NAME     <FaCity size={30}  className='cityicon'    />  </h1> 
        <input
          type="text"
          value={countryName}
          onChange={handleInputChange}
          placeholder="Enter city name "
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      
      <div className='weather'>
        
     
      </div>
      {Array.isArray(weather) ? (
        weather.map((v, i) => (

          <div className='details ' key={i}>

            
            <h1>{v.name}  <span className='country'> &emsp;{v.sys.country}</span>  <span> <FaShareSquare size={30} className='share'/></span> </h1>
           
           

            <p>updated a few minutes ago </p>


            <h1 className='sundegree'> 
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <HiOutlineSun className='sun' size={70} />
              <span>{Math.round(v.main.temp)}°<sup>c</sup></span>
            </div>
            <div className="feelslike">
              <p>feels like </p>
              <h5>{Math.round(v.main.feels_like) }° <sup>c</sup></h5>
            </div>
           


            <div className="pmmh">
              <p>Pressure: {v.main.pressure}</p>
              <p>Min_temp: {v.main.temp_min}</p>
              <p>Max_temp: {v.main.temp_max}</p>
              <p>Humidity :{v.main.humidity}</p>
            </div>

            <div className="clouds">
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100">

  <g fill="#FFFFFF" fill-opacity="0.9">

    <circle cx="30" cy="30" r="20" />
    <circle cx="50" cy="25" r="25" />
    <circle cx="70" cy="30" r="20" />
    <circle cx="85" cy="25" r="25" />

   
    <circle cx="150" cy="20" r="25" />
    <circle cx="170" cy="100" r="30" />
    <circle cx="190" cy="20" r="25" />

    <circle cx="210" cy="20" r="25" />
    <circle cx="230" cy="15" r="30" />
    <circle cx="250" cy="20" r="25" />
  </g>
</svg>

            </div>


            </h1> 
            <br />
            <br />
            <br />

            <div>
              <p>wind_speed: {v.wind.speed}</p>
              <p>wind_deg: {v.wind.deg}</p>
            </div>

            <br />
            <br /><br /><br />


            
            

          
           
            <p>Longitude: {v.coord.lon}</p>
            <p>Latitude: {v.coord.lat}</p>
            {/* Display other weather details here */}
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Weather;
