const DataService = require('../services/DataService');

class WeatherController {
    constructor() {
        this.dataService = new DataService();
    }

    // [GET] /api/weather
    getWeather(req, res) {
        try {
            // Lấy dữ liệu thời tiết (Mock từ service)
            const weatherData = this.dataService.getCurrentWeather();
            
            res.json({
                success: true,
                data: weatherData
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch weather data' });
        }
    }
}

module.exports = WeatherController;
