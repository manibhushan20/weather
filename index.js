const express = require('express');
const axios = require('axios');


const app = express();
const port = 3000;


app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const city = req.query.place;

  if (!city) {
    return res.render('index', { name: '', weatherIcon: '', date: '', month: '', year: '', weatherDescription: '', temp: '', minTemp: '', maxTemp: '', tempFeels: '', humidity: '', wind: '', Sunrise: '', Sunset: '', longitude: '', latitude: '', error: 'Please enter a city name' });
  }

  try {
    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5c1de6e215947ca1e35522f247ba487e&units=metric`);
    const weather = weatherData.data;

    const date = new Date(weather.dt * 1000);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const weatherDescription = weather.weather[0].description;
    const temp = (weather.main.temp)
    const minTemp = (weather.main.temp_min)
    const maxTemp = (weather.main.temp_max)
    const tempFeels = (weather.main.feels_like)
    const humidity = weather.main.humidity;
    const wind = weather.wind.speed;

    const Sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US');
    const Sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US');
    
    const longitude = weather.coord.lon;
    const latitude = weather.coord.lat;

    const weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

    res.render('index', { name: city, weatherIcon: weatherIcon, date: day, month: month, year: year, weatherDescription: weatherDescription, temp: temp, minTemp: minTemp, maxTemp: maxTemp, tempFeels: tempFeels, humidity: humidity, wind: wind, Sunrise: Sunrise, Sunset: Sunset, longitude: longitude, latitude: latitude });
  } catch (error) {
    console.error(error);
    res.render('index', { name: '', weatherIcon: '', date: '', month: '', year: '', weatherDescription: '', temp: '', minTemp: '', maxTemp: '', tempFeels: '', humidity: '', wind: '', Sunrise: '', Sunset: '', longitude: '', latitude: '', error: 'City not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});