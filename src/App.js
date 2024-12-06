import React, {Component} from "react";
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        apiKey: process.env.REACT_APP_WEATHER_API_KEY,
        city: "Canton",
        weatherData: ""
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
      let res = await axios.get(`${url}?q=${this.state.city}&appid=${this.state.apiKey}`);
      console.log(res.data);
      return res.data;

    } catch (err) {
        console.log(err.message);
    }
  }

  getWeatherWithFetch = async (data) => {
    let url = "https://api.openweathermap.org/data/2.5/weather";
    try {
      let res = await axios.get(`${url}?lat=${data.lat}&lon=${data.lon}&appid=${this.state.apiKey}`)

      console.log(res.data.weather[0]);
      return res.data.weather[0];

    } catch (error) {
        console.log(error.message)
    }

  }

  
  render() {
    return (
      <div className="App">
        <h1>Weather App</h1>
        <p>{`City: ${this.state.city}`}</p>
        <p>{`Weather: ${this.state.weatherData.main}`}</p>
        
      </div>
    );
  }

}

export default App;
