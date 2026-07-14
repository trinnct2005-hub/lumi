const express = require('express');
const router = express.Router();
const ConfigController = require('./controllers/ConfigController');
const WeatherController = require('./controllers/WeatherController');

const configController = new ConfigController();
const weatherController = new WeatherController();

router.get('/config', configController.getConfig.bind(configController));
router.post('/config', configController.updateConfig.bind(configController));
router.get('/weather', weatherController.getWeather.bind(weatherController));

module.exports = router;
