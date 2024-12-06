import './App.css';
import React, {Component} from "react";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        apiKey: process.env.REACT_APP_WEATHER_API_KEY,
        city: "Canton",
        weatherData: [],
    }
}

  async componentDidMount() {
    const res = await this.getCoordinatesWithFetch();
    const weather = await this.getWeatherWithFetch(res[0]);
    this.setState({
      weatherData: weather,
    })
  }

  getCoordinatesWithFetch = async () => {
    let url = "http://api.openweathermap.org/geo/1.0/direct"
    
    try {
      let res = await fetch(`${url}?q=${this.state.city}&appid=${this.state.apiKey}`)
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`)
      }

      let data = await res.json();
      return data;

    } catch (error) {
        console.log(error.message);
    }
  }

  getWeatherWithFetch = async (data) => {
    let url = "https://api.openweathermap.org/data/2.5/weather";
    try {
      let res = await fetch(`${url}?lat=${this.state.lat}&lon=${this.state.lon}&appid=${this.state.apiKey}`)
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`)
      }

      let weather = await res.json();
      console.log(weather);

    } catch (error) {
        console.log(error.message)
    }

  }

  
  render() {
    return (
      <div className="App">
        <h1>Weather App</h1>
        <p>{`API KEY: ${process.env.REACT_APP_WEATHER_API_KEY}`}</p>
        <p>{`Lat: `}</p>
      </div>
    );
  }

}

export default App;
