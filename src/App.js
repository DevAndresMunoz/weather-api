import './App.css';
import React, {Component} from "react";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        lat: null,
        lon: null
    }
}

  componentDidMount() {
    this.getCoordinatesWithFetch;
  }

  getCoordinatesFetch = async () => {
    let apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    let city = "Canton";
    let url = "http://api.openweathermap.org/geo/1.0/direct"
    
    try {
      let res = await fetch(`${url}?q=${city}&appid=${apiKey}`)
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`)
      }

      let data = await res.json();
      console.log(data);
      this.setState({ 
          lat: data[0].lat, 
          lon: data[0].lon,
      })

    } catch (error) {
        console.log(error.message);
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Weather App</h1>
        <p>{`API KEY: ${process.env.REACT_APP_WEATHER_API_KEY}`}</p>
        <p>{`Lat: ${this.state.lat}, Lon: ${this.state.lon}`}</p>
      </div>
    );
  }

}

export default App;
