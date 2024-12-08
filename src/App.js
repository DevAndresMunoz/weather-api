import React, {Component} from "react";
import './App.css';
import axios from 'axios';
import apiGeocode from "./geocodingAPI";
import apiWeatherCall from "./weatherAPI";


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
        const weather = await this.getWeather(res);
        this.setState({
            cityName: res.name,
            weatherData: weather,
        })
    }


    getCoordinatesUsingZip = async () => {
		try {
			let res = await apiGeocode.get(`zip?zip=${this.state.zipCode}&appid=${this.state.apiKey}`);
			return res.data;


        } catch (err) {
                console.log(err.message);
        }
    }

    getWeather = async (data) => {
        try {
            let res = await apiWeatherCall.get(`weather?lat=${data.lat}&lon=${data.lon}&appid=${this.state.apiKey}`)

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
				<p>{`Zip: ${this.state.zipCode}`}</p>
                <p>{`Weather: ${this.state.weatherData.main}`}</p>
                
            </div>
        );
    }

}

export default App;
