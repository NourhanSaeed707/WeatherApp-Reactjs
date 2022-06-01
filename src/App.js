import React, { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [ data , setData ] = useState({});
  const [ location, setLocation ] = useState('');
   
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid={API_KEY}`;
  // search function to get temperature of specific city and country that we are looking for in searhBox.
  const search = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        console.log("search");
        setData(response.data)
        console.log(response.data);
      })
      setLocation('')
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&APPID={API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    fetchData();
  }, [lat,long])
  return (
    <div className="app">
     <div className = "search">
        <input type = "text" 
        name = "search" 
        value = {location}
        onChange = {event => setLocation(event.target.value)}
        onKeyPress = {search}
        placeholder ='Enter Location' 
        />
      </div>

      <div className="container">
        <div className="top">
         <div className="location">
         {data.name ? <p>{data.name},{data.sys.country}</p> : null}
         </div>
         <div className="temp">
           {data.main ? <h1>{Math.round(data.main.temp - 273.15)}°c</h1> : null}
         </div>
         <div className="description">
           {data.weather ? <p>{data.weather[0].main}</p> : null}
         </div>
        </div>

        {data.name !== 'undefined' && 
            <div className="bottom">
            <div className="feels">
            {data.main ? <p className='bold'>{Math.round(data.main.temp - 273.15)}°c</p> : null}
              <p> Temp</p>
            </div>
            <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed}MPH</p> : null}
              <p>Wind Speed</p>
            </div>
        </div> 
    }
        
      </div>
    </div>
  );
}

export default App;
