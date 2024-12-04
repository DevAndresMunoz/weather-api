import './App.css';
import React from "react";


function App() {
  const getCoordinatesFetch = async () => {
    let apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    let city = "Canton";
    let url = "http://api.openweathermap.org/geo/1.0/direct"
    
    try {
      let res = await fetch(`${url}?q=${city}&appid=${apiKey}`)
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className="App">
      <h1>hello</h1>
      <p>{getCoordinatesFetch}</p>
    </div>
  );
}

export default App;
