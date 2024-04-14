require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;

    try {
        const response = await axios.get(url);
        const weather = response.data;
        res.render('index', {
            weather: `It's currently ${weather.main.temp} degrees in ${weather.name} with ${weather.weather[0].description}.`,
            error: null
        });
    } catch (error) {
        res.render('index', {
            weather: null,
            error: 'Error, please try again'
        });
    }
});

app.listen(port, () => {
    console.log(`Weather Dashboard running on http://localhost:${port}`);
});
