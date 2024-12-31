import React, { use } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './weather.css';

function Weather() {

    const [getCity, setCity] = useState('');
    const [getWather, setWeather] = useState('');
    const [error, SetError] = useState(null);

    const myFun = (e)=>{
        setCity(e.target.value)
    }
    
    const handleSearch = async (e)=>{
        e.preventDefault();
        SetError('');
        setWeather(null);
        try {
            const API_KEY = `73cb994951be9a92baa0b53fc0da77c2`;
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${getCity}&appid=${API_KEY}`);
            
            // console.log(response.data)
            if(response.status==404){
                throw new Error('City not Found')
            }

            if(response.data && response.data.main && response.data.weather){
                setWeather(response.data);
                SetError(null);
            }else{
                SetError("Weather data no available");
                setWeather(null);
            }

        } catch (error) {
            SetError('City not Found');
            setWeather(null);
        };
    };
  return (
    <div className='weather-container'>
        <div className='weather-card'>
            <h1 className='title'>Weatehr App</h1>
            <input 
                type="text" 
                className='city-input'
                onChange={myFun}
                placeholder='Enter City'
                value={getCity}
                
            />
            <button className='search-btn' onClick={handleSearch}>
                Get Weather
            </button>
            {error && <p style={{color:'red'}}>{error}</p>}

            {
                getWather && getWather.name && (
                    <div className='weather-info'>
                        <p className='city-name'>{getWather.name}</p>
                        <p className='weather-description'>Sunny</p>
                        <p className='temperature'>{getWather.main?.temp ? `${getWather.main.temp}`:'Templareture not available' }</p>


                        <div className='additional-info'>
                            <p>Humidity: {getWather.main?.humidity || 'N/A'}%</p>
                            <p>Wind: {getWather.wind?.speed || 'N/A'}km/h</p>
                        </div>

                    </div>

                   

                )
            }

        </div>
    </div>
  )
}

export default Weather