import React, {Component} from "react";
import './App.css';
import axios from 'axios';
import getCoordinates from "./api";


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apiKey: process.env.REACT_APP_WEATHER_API_KEY,
			zipCode : "80110",
			cityName: "",
			weatherData: "",
		}
	}

    async componentDidMount() {
        const res = await this.getCoordinatesUsingZip();
        const weather = await this.getWeatherWithFetch(res);
        this.setState({
            cityName: res.name,
            weatherData: weather,
        })
    }



    getCoordinatesUsingZip = async () => {
        let url = "http://api.openweathermap.org/geo/1.0/zip"

        try {
            let res = await axios.get(`${url}?zip=${this.state.zipCode}&appid=${this.state.apiKey}`);
            return res.data;


        } catch (err) {
                console.log(err.message);
        }
    }

    getWeatherWithFetch = async (data) => {
        let url = "https://api.openweathermap.org/data/2.5/weather";
        try {
            let res = await axios.get(`${url}?lat=${data.lat}&lon=${data.lon}&appid=${this.state.apiKey}`)

            return res.data.weather[0];

        } catch (error) {
                console.log(error.message)
        }

    }

    
    render() {
        return (
            <div className="App">
                <h1>Weather App</h1>
                <p>{`City: ${this.state.cityName}`}</p>
                <p>{`Weather: ${this.state.weatherData.main}`}</p>
                
            </div>
        );
    }

}

export default App;
