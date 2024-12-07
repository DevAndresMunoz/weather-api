import axios from axios;

const apiCoordinateCall = axios.create({
    baseURL: "http://api.openweathermap.org/geo/1.0/direct",
    timeout: 5000,
});

const getCoordinates = async (endpoint) => {
    try {
        const res = await apiCoordinateCall(endpoint);
        return res.data
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

const 





