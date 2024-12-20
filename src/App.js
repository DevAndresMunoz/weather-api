import React, {Component} from "react";
import './App.css';
import axios from 'axios';

// API wrappers
const apiGeocode = axios.create({
	baseURL: "http://api.openweathermap.org/geo/1.0/",
	timeout: 5000,
});

const apiWeatherCall = axios.create({
	baseURL: "https://api.openweathermap.org/data/2.5/",
	timeout: 5000,
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apiKey: process.env.REACT_APP_WEATHER_API_KEY,
			zipCode : "80110",
			cityName: "",
			weather: "",
			tempData: "",
		}
	}

    async componentDidMount() {
        const res = await this.getCoordinatesUsingZip();
        const weather = await this.getWeather(res);
        this.setState({
            cityName: res.name,
            weather: weather.weather[0],
			tempData: weather.main,
        })
    }

    getCoordinatesUsingZip = async () => {
		try {
			let res = await apiGeocode.get(`zip?`, {
				params: {
					zip: this.state.zipCode,
					appid: this.state.apiKey,
				}
			});
			return res.data;

        } catch (err) {
                console.log(err.message);
        }
    }

    getWeather = async (data) => {
        try {
            let res = await apiWeatherCall.get('weather?', {
				params: {
					lat: data.lat,
					lon: data.lon,
					units: "imperial",
					appid: this.state.apiKey,
				}
			});
            return res.data;

        } catch (error) {
                console.log(error.message)
        }

    }

	testAPI = async () => {
		try {
			let res = await axios.get('http://localhost:5000/products')
			console.log(res)
			return res;
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
                <p>{`Weather: ${this.state.weather.main}`}</p>
				<p>{`Current Temperature: ${Math.round(this.state.tempData.temp)}° F`}</p>
				<p>{`High: ${Math.round(this.state.tempData.temp_max)}° F`}</p>
				<p>{`Low: ${Math.round(this.state.tempData.temp_min)}° F`}</p>
				<p>{`Humidity: ${this.state.tempData.humidity}%`}</p>
                <button onClick={this.testAPI}>Test API Request</button>
            </div>
        );
    }

}

export default App;
