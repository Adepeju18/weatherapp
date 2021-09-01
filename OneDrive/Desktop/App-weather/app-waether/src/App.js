import React, {useState} from "react";
import './App.css';

const api={
  key:"0d1b2f29e632ee2645f8f2c2350b3e06",
  base:"https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [city, setCity]= useState("");
  const [weather, setWeather]= useState({});
  const search = ev =>{
    if(ev.key==="Enter"){
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(data =>{ 
        setWeather(data);
        setCity("");
        console.log(data);
      })
      .catch(function (error){
        console.log(error);
      })
    }
  }
  const dateBuilder=(d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", 
  "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "saturday"];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className="App">
      <main>
        <div className="search-box">
        <input
        type="text"
        className="search-bar"
        placeholder="search..."
        onChange={e => setCity(e.target.value)}
        value={city}
        onKeyPress={search}
        />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}c
              </div>
              <div className="weather">{weather.weather[0].main}</div>
          </div>
          </div>
          ) : ("")}
      </main>
    </div>
  );
}
export default App;


