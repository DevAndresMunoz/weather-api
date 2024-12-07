import axios from 'axios';

const apiCoordinateCall = axios.create({
    baseURL: "http://api.openweathermap.org/geo/1.0/",
    timeout: 5000,
});

export default apiCoordinateCall;





