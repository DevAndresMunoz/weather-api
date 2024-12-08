import axios from 'axios';

const apiGeocode = axios.create({
    baseURL: "http://api.openweathermap.org/geo/1.0/",
    timeout: 5000,
});

export default apiGeocode;





